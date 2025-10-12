#!/bin/bash
set -e

# Schema synchronization script for NeoTool GraphQL contracts
# This script syncs schemas FROM service modules TO contracts (source of truth)

echo "🔄 GraphQL Schema Synchronization"
echo "================================="

# Define paths
CONTRACTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_DIR="$CONTRACTS_DIR/../../service"

# Function to find schema sources in service modules (skip build directories)
find_schema_sources() {
    local schema_sources=()
    
    # Find all schema.graphqls files in service directory, excluding build directories
    while IFS= read -r -d '' file; do
        # Skip bin/ and build/ directories
        if [[ "$file" != *"/bin/"* ]] && [[ "$file" != *"/build/"* ]]; then
            schema_sources+=("$file")
        fi
    done < <(find "$SERVICE_DIR" -name "schema.graphqls" -type f -print0)
    
    echo "${schema_sources[@]}"
}

# Function to list available subgraphs
list_available_subgraphs() {
    local subgraphs=()
    
    # Find existing subgraphs
    for subgraph_dir in "$CONTRACTS_DIR/subgraphs"/*; do
        if [[ -d "$subgraph_dir" ]]; then
            local subgraph_name=$(basename "$subgraph_dir")
            subgraphs+=("$subgraph_name")
        fi
    done
    
    echo "${subgraphs[@]}"
}

# Function to display interactive menu
show_interactive_menu() {
    local schema_sources=($(find_schema_sources))
    local available_subgraphs=($(list_available_subgraphs))
    
    if [[ ${#schema_sources[@]} -eq 0 ]]; then
        echo "❌ No schema sources found in $SERVICE_DIR"
        echo "   Expected pattern: */src/main/resources/graphql/schema.graphqls"
        echo "   (excluding bin/ and build/ directories)"
        return 1
    fi
    
    echo ""
    echo "📋 Found ${#schema_sources[@]} schema source(s):"
    echo ""
    
    # Display schema sources with numbers
    for i in "${!schema_sources[@]}"; do
        local rel_path="${schema_sources[$i]#$SERVICE_DIR/}"
        echo "  [$((i+1))] $rel_path"
    done
    
    echo ""
    echo "📁 Available subgraphs:"
    if [[ ${#available_subgraphs[@]} -eq 0 ]]; then
        echo "  (none - you can create a new one)"
    else
        for i in "${!available_subgraphs[@]}"; do
            echo "  [$((i+1))] ${available_subgraphs[$i]}"
        done
    fi
    
    echo ""
    echo "Please select:"
    echo "  1. Schema source number (1-${#schema_sources[@]})"
    echo "  2. Subgraph name (existing number or new name)"
    echo ""
}

# Function to sync schema from service to contract
sync_to_contract() {
    local source_schema="$1"
    local subgraph_name="$2"
    local target_schema="$CONTRACTS_DIR/subgraphs/$subgraph_name/schema.graphqls"
    
    echo "📋 Syncing schema to contract..."
    echo "   Source: ${source_schema#$SERVICE_DIR/}"
    echo "   Target: subgraphs/$subgraph_name/schema.graphqls"
    
    # Create subgraph directory if it doesn't exist
    mkdir -p "$(dirname "$target_schema")"
    
    # Create backup if target exists
    if [[ -f "$target_schema" ]]; then
        cp "$target_schema" "$target_schema.backup"
        echo "💾 Created backup: $target_schema.backup"
    fi
    
    # Copy schema
    cp "$source_schema" "$target_schema"
    echo "✅ Schema synchronized to contract: $subgraph_name"
}

# Function to run interactive sync
interactive_sync() {
    local schema_sources=($(find_schema_sources))
    local available_subgraphs=($(list_available_subgraphs))
    
    show_interactive_menu
    
    # Get schema source selection
    echo -n "Select schema source (1-${#schema_sources[@]}): "
    read -r source_choice
    
    if ! [[ "$source_choice" =~ ^[0-9]+$ ]] || [[ "$source_choice" -lt 1 ]] || [[ "$source_choice" -gt ${#schema_sources[@]} ]]; then
        echo "❌ Invalid selection: $source_choice"
        return 1
    fi
    
    local selected_source="${schema_sources[$((source_choice-1))]}"
    
    # Get subgraph selection
    echo -n "Select subgraph (number or new name): "
    read -r subgraph_choice
    
    local selected_subgraph=""
    
    # Check if it's a number (existing subgraph)
    if [[ "$subgraph_choice" =~ ^[0-9]+$ ]] && [[ "$subgraph_choice" -ge 1 ]] && [[ "$subgraph_choice" -le ${#available_subgraphs[@]} ]]; then
        selected_subgraph="${available_subgraphs[$((subgraph_choice-1))]}"
    else
        # Treat as new subgraph name
        selected_subgraph="$subgraph_choice"
        
        # Validate subgraph name
        if [[ ! "$selected_subgraph" =~ ^[a-zA-Z][a-zA-Z0-9_-]*$ ]]; then
            echo "❌ Invalid subgraph name: $selected_subgraph"
            echo "   Must start with letter and contain only letters, numbers, hyphens, and underscores"
            return 1
        fi
    fi
    
    # Confirm and sync
    echo ""
    echo "🔄 Ready to sync:"
    echo "   From: ${selected_source#$SERVICE_DIR/}"
    echo "   To:   subgraphs/$selected_subgraph/schema.graphqls"
    echo ""
    echo -n "Continue? (y/N): "
    read -r confirm
    
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        sync_to_contract "$selected_source" "$selected_subgraph"
        echo "🎉 Schema synchronization completed!"
    else
        echo "❌ Synchronization cancelled"
    fi
}

# Function to validate schema consistency
validate_schemas() {
    echo "🔍 Validating schema consistency..."
    
    local schema_sources=($(find_schema_sources))
    local validation_errors=0
    
    for source in "${schema_sources[@]}"; do
        local rel_path="${source#$SERVICE_DIR/}"
        
        # Try to determine subgraph name from path
        if [[ "$rel_path" =~ ^([^/]+)/([^/]+)/.*/schema\.graphqls$ ]]; then
            local language="${BASH_REMATCH[1]}"
            local module="${BASH_REMATCH[2]}"
            local subgraph_name="${language}_${module}"
            
            local contract_schema=""
            if [[ -f "$CONTRACTS_DIR/subgraphs/$subgraph_name/schema.graphqls" ]]; then
                contract_schema="$CONTRACTS_DIR/subgraphs/$subgraph_name/schema.graphqls"
            elif [[ -f "$CONTRACTS_DIR/subgraphs/$module/schema.graphqls" ]]; then
                contract_schema="$CONTRACTS_DIR/subgraphs/$module/schema.graphqls"
            fi
            
            if [[ -n "$contract_schema" ]]; then
                if ! diff -q "$source" "$contract_schema" > /dev/null; then
                    echo "⚠️  Schema mismatch: $rel_path"
                    echo "   Service: $source"
                    echo "   Contract: $contract_schema"
                    ((validation_errors++))
                else
                    echo "✅ Schema consistent: $rel_path"
                fi
            else
                echo "⚠️  No contract found for: $rel_path"
                ((validation_errors++))
            fi
        fi
    done
    
    if [[ $validation_errors -eq 0 ]]; then
        echo "✅ All schemas are consistent"
        return 0
    else
        echo "❌ Found $validation_errors validation error(s)"
        echo "   Run 'sync' to fix these issues"
        return 1
    fi
}

# Function to generate supergraph schema
generate_supergraph() {
    echo "🚀 Generating supergraph schema..."
    
    cd "$CONTRACTS_DIR/supergraph"
    
    # Use the enhanced generate-schema.sh script
    if [[ "${CI:-false}" == "true" ]] || [[ "${USE_DOCKER_ROVER:-false}" == "true" ]]; then
        USE_DOCKER_ROVER=true ./scripts/generate-schema.sh
    else
        ./scripts/generate-schema.sh
    fi
}

# Main execution
case "${1:-sync}" in
    "sync")
        interactive_sync
        ;;
    "validate")
        validate_schemas
        ;;
    "generate")
        generate_supergraph
        ;;
    "all")
        interactive_sync
        validate_schemas
        generate_supergraph
        echo "🎉 Full schema management completed!"
        ;;
    *)
        echo "Usage: $0 {sync|validate|generate|all}"
        echo ""
        echo "Commands:"
        echo "  sync     - Interactive sync from service modules to contracts"
        echo "  validate - Validate schema consistency between services and contracts"
        echo "  generate - Generate supergraph schema"
        echo "  all      - Run all operations"
        echo ""
        echo "Environment variables:"
        echo "  CI=true              - Use Docker for rover (CI environment)"
        echo "  USE_DOCKER_ROVER=true - Force Docker usage for rover"
        echo ""
        echo "Workflow:"
        echo "  1. Edit GraphQL schema in your service module"
        echo "  2. Run './sync-schemas.sh sync'"
        echo "  3. Select the schema source and target subgraph"
        echo "  4. Schema is copied from service → contract"
        echo ""
        echo "Schema Discovery:"
        echo "  Automatically discovers schema sources in service directory"
        echo "  Skips bin/ and build/ directories"
        echo "  Supports patterns: kotlin/app, kotlin/security, python/module_x, etc."
        exit 1
        ;;
esac
