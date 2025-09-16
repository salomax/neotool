#!/bin/bash

# Update Import Paths Script
# This script updates all import paths to match the new folder structure

set -e

echo "🔄 Updating import paths..."

# Update component imports
echo "📦 Updating component imports..."

# Update UI component imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/ui/|@/atoms/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/loading/|@/atoms/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/feedback/|@/molecules/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/inputs/|@/molecules/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/emptystate/|@/molecules/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/organisms/|@/organisms/|g'

# Update form imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/form/|@/features/forms/components/|g'

# Update shared component imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/shared/components/|@/shared/components/|g'

# Update utility imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/lib/|@/shared/utils/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/shared/utils/br/|@/shared/utils/br/|g'

# Update config imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/config/|@/shared/config/|g'

# Update i18n imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/i18n/|@/shared/i18n/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/i18n/|@/shared/i18n/|g'

# Update hooks imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/hooks/|@/shared/hooks/|g'

# Update types imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/types/|@/shared/types/|g'

# Update theme imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/theme/|@/styles/themes/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/theme/|@/styles/themes/|g'

# Update query imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/query/|@/lib/api/|g'

# Update layout imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/layouts/|@/shared/components/layout/|g'

# Update test imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/test/|@/__tests__/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/testing/|@/__tests__/|g'

# Update specific component imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/LoadingSpinner|@/atoms/LoadingSpinner|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/ClientProviders|@/providers/ClientProviders|g'

# Update relative imports that might be broken
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "\.\./\.\./\.\./web/src/theme/|from "@/styles/themes/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "\.\./\.\./theme/|from "@/styles/themes/|g'

echo "✅ Import paths updated!"
echo "📋 Next steps:"
echo "1. Check for any remaining import errors"
echo "2. Test the application"
echo "3. Update Storybook configuration if needed"
