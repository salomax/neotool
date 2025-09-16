#!/bin/bash

# Folder Structure Migration Script
# This script will reorganize the src folder according to best practices

set -e

echo "🚀 Starting folder structure migration..."

# Create new directory structure
echo "📁 Creating new directory structure..."
mkdir -p src/shared/components/ui/{atoms,molecules,organisms,layout}
mkdir -p src/features/{forms,data-table,dashboard,auth}/{components,hooks,services,types}
mkdir -p src/shared/{hooks,utils,constants,types,config,i18n}
mkdir -p src/lib/{api,auth,external}
mkdir -p src/styles/{themes,components}
mkdir -p src/__tests__

# Move UI Components (Atomic Design)
echo "🎨 Moving UI components to atomic design structure..."

# Atoms - Basic building blocks
mv src/components/ui/Avatar.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/ui/Badge.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/ui/Button.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/ui/Link.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/ui/TextField.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/ui/Tooltip.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/LoadingSpinner.tsx src/shared/components/ui/atoms/ 2>/dev/null || true
mv src/components/loading/PageSkeleton.tsx src/shared/components/ui/atoms/ 2>/dev/null || true

# Molecules - Simple combinations
mv src/components/ui/SearchField.tsx src/shared/components/ui/molecules/ 2>/dev/null || true
mv src/components/ui/Select.tsx src/shared/components/ui/molecules/ 2>/dev/null || true
mv src/components/feedback/* src/shared/components/ui/molecules/ 2>/dev/null || true
mv src/components/emptystate/* src/shared/components/ui/molecules/ 2>/dev/null || true
mv src/components/inputs/* src/shared/components/ui/molecules/ 2>/dev/null || true

# Organisms - Complex components
mv src/components/organisms/* src/shared/components/ui/organisms/ 2>/dev/null || true

# Layout components
mv src/layouts/* src/shared/components/layout/ 2>/dev/null || true

# Feature-based organization
echo "🏗️ Organizing by features..."

# Forms feature
mv src/components/form/* src/features/forms/components/ 2>/dev/null || true

# Data Table feature
mv src/components/table/* src/features/data-table/components/ 2>/dev/null || true

# Shared resources
echo "🔧 Consolidating shared resources..."

# Utils
mv src/lib/br src/shared/utils/ 2>/dev/null || true
mv src/lib/url.ts src/shared/utils/ 2>/dev/null || true
mv src/shared/utils/* src/shared/utils/ 2>/dev/null || true

# Config
mv src/config/* src/shared/config/ 2>/dev/null || true

# i18n
mv src/i18n/* src/shared/i18n/ 2>/dev/null || true
mv src/components/i18n/* src/shared/i18n/ 2>/dev/null || true

# Hooks
mv src/hooks/* src/shared/hooks/ 2>/dev/null || true

# Types
mv src/types/* src/shared/types/ 2>/dev/null || true

# Styles and themes
mv src/theme/* src/styles/themes/ 2>/dev/null || true
mv src/components/theme/* src/styles/themes/ 2>/dev/null || true

# API and external integrations
mv src/query/* src/lib/api/ 2>/dev/null || true

# Test utilities
mv src/test/* src/__tests__/ 2>/dev/null || true
mv src/components/testing/* src/__tests__/ 2>/dev/null || true

# Clean up empty directories
echo "🧹 Cleaning up empty directories..."
find src -type d -empty -delete 2>/dev/null || true

# Remove old component directories
rm -rf src/components 2>/dev/null || true
rm -rf src/layouts 2>/dev/null || true
rm -rf src/config 2>/dev/null || true
rm -rf src/i18n 2>/dev/null || true
rm -rf src/hooks 2>/dev/null || true
rm -rf src/types 2>/dev/null || true
rm -rf src/theme 2>/dev/null || true
rm -rf src/query 2>/dev/null || true
rm -rf src/test 2>/dev/null || true

echo "✅ Migration completed!"
echo "📋 Next steps:"
echo "1. Update import paths in all files"
echo "2. Update tsconfig.json path mappings"
echo "3. Update Storybook configuration"
echo "4. Test the application"
