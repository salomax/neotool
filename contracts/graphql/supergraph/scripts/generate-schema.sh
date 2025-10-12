#!/bin/bash
set -e

echo "Generating supergraph schema..."

# Function to run rover in Docker (recommended for CI/CD)
run_rover_docker() {
    echo "Using Docker-based rover..."
    docker run --rm \
        -v "$(pwd):/workspace" \
        -w /workspace \
        -e APOLLO_ELV2_LICENSE=accept \
        apollographql/rover:latest \
        supergraph compose \
        --config ./supergraph.yaml \
        --output ./supergraph.graphql
}

# Function to run rover locally (for development)
run_rover_local() {
    echo "Using local rover..."
    
    # Check if rover is installed
    if ! command -v rover &> /dev/null; then
        echo "Error: rover is not installed or not in PATH"
        echo "Please install rover first:"
        echo "  curl -sSL https://rover.apollo.dev/nix/latest | sh"
        echo "  or visit: https://www.apollographql.com/docs/rover/getting-started/"
        echo ""
        echo "Alternatively, use Docker:"
        echo "  docker run --rm -v \$(pwd):/workspace -w /workspace apollographql/rover:latest supergraph compose --config ./supergraph.yaml --output ./supergraph.graphql"
        exit 1
    fi

    # Accept ELv2 license
    export APOLLO_ELV2_LICENSE=accept

    # Generate the supergraph schema
    rover supergraph compose \
        --config ./supergraph.yaml \
        --output ./supergraph.graphql
}

# Check if we should use Docker (CI environment or explicit flag)
if [[ "${CI:-false}" == "true" ]] || [[ "${USE_DOCKER_ROVER:-false}" == "true" ]] || [[ "${1:-}" == "--docker" ]]; then
    run_rover_docker
else
    run_rover_local
fi

echo "Supergraph schema generated successfully!"
echo "File size: $(wc -c < supergraph.graphql) bytes"
echo "Location: $(pwd)/supergraph.graphql"
