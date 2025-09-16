# 🏗️ Folder Structure Recommendations & Migration Plan

## 📊 Current State Analysis

### ❌ **Issues Identified:**

1. **Inconsistent Organization**
   - Mix of atomic design (`ui/`) and feature-based (`components/`)
   - Duplicate concerns (`components/` and `shared/components/`)
   - Empty `features/` folder not being utilized

2. **Scattered Related Files**
   - Form components split across multiple folders
   - Similar components in different locations
   - Stories mixed with components

3. **Mixed Concerns**
   - Business logic mixed with UI components
   - Utilities scattered across multiple folders
   - Configuration files in wrong locations

4. **Naming Inconsistencies**
   - Mix of kebab-case and camelCase
   - Inconsistent folder naming patterns

## 🎯 **Recommended Gold Standard Structure**

```
src/
├── app/                          # Next.js App Router (keep as-is)
│   ├── (app)/
│   ├── design-system/
│   ├── documentation/
│   └── ...
├── features/                     # Feature-based organization
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── dashboard/
│   ├── forms/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── data-table/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── shared/                       # Truly shared utilities
│   ├── components/
│   │   ├── ui/                   # Atomic design components
│   │   │   ├── atoms/            # Basic building blocks
│   │   │   ├── molecules/        # Simple combinations
│   │   │   └── organisms/        # Complex components
│   │   └── layout/               # Layout components
│   ├── hooks/                    # Shared custom hooks
│   ├── utils/                    # Pure utility functions
│   ├── constants/                # App-wide constants
│   ├── types/                    # Global type definitions
│   ├── config/                   # App configuration
│   └── i18n/                     # Internationalization
├── lib/                          # External library integrations
│   ├── api/                      # API clients
│   ├── auth/                     # Auth providers
│   └── external/                 # Third-party integrations
├── providers/                    # React context providers
├── styles/                       # Global styles and themes
│   ├── themes/
│   ├── globals.css
│   └── components/
└── __tests__/                    # Global test utilities
```

## 🔄 **Migration Strategy**

### **Phase 1: Atomic Design Implementation**
- **Atoms**: Basic UI components (Button, Input, Avatar, etc.)
- **Molecules**: Simple combinations (SearchField, FormField, etc.)
- **Organisms**: Complex components (DataTable, Navigation, etc.)

### **Phase 2: Feature-Based Organization**
- **features/forms/**: All form-related components and logic
- **features/data-table/**: DataTable and related components
- **features/dashboard/**: Dashboard-specific components
- **features/auth/**: Authentication components

### **Phase 3: Shared Resources Consolidation**
- **shared/utils/**: Pure utility functions
- **shared/hooks/**: Shared custom hooks
- **shared/types/**: Global type definitions
- **shared/config/**: App configuration

### **Phase 4: External Integrations**
- **lib/api/**: API clients and query providers
- **lib/external/**: Third-party integrations
- **providers/**: React context providers

## 📋 **Detailed Migration Mapping**

### **UI Components (Atomic Design)**
```
src/components/ui/ → src/shared/components/ui/atoms/
├── Avatar.tsx
├── Badge.tsx
├── Button.tsx
├── Link.tsx
├── TextField.tsx
└── Tooltip.tsx

src/components/loading/ → src/shared/components/ui/atoms/
└── PageSkeleton.tsx

src/components/ui/ → src/shared/components/ui/molecules/
├── SearchField.tsx
└── Select.tsx

src/components/feedback/ → src/shared/components/ui/molecules/
├── ConfirmDialog.tsx
└── ToastProvider.tsx

src/components/inputs/ → src/shared/components/ui/molecules/
├── AsyncAutocomplete.tsx
├── FileUploader.tsx
└── MaskedField.tsx

src/components/organisms/ → src/shared/components/ui/organisms/
└── DataTable.tsx
```

### **Feature-Based Organization**
```
src/components/form/ → src/features/forms/components/
├── FormLayout.tsx
├── FormSection.tsx
├── FormActions.tsx
├── FormErrorBanner.tsx
├── FormRow.tsx
└── fields/
    ├── ControlledTextField.tsx
    ├── ControlledNumberField.tsx
    └── ...

src/components/table/ → src/features/data-table/components/
├── agGrid.utils.ts
└── enterprise/
```

### **Shared Resources**
```
src/lib/ → src/shared/utils/
├── br/
└── url.ts

src/config/ → src/shared/config/
├── nav.config.ts
└── nav.ts

src/i18n/ → src/shared/i18n/
├── client.ts
├── config.ts
└── locales/

src/hooks/ → src/shared/hooks/
├── useAutoSave.ts
├── useDataTableQuery.ts
├── useResponsive.ts
└── useZodForm.ts

src/types/ → src/shared/types/
└── react-input-mask.d.ts
```

### **External Integrations**
```
src/query/ → src/lib/api/
└── AppQueryProvider.tsx

src/theme/ → src/styles/themes/
├── theme.ts
├── tokens.ts
└── AppThemeProvider.tsx
```

## 🎯 **Benefits of New Structure**

### **1. Clear Separation of Concerns**
- UI components separated from business logic
- Feature-specific code isolated
- Shared utilities centralized

### **2. Scalability**
- Easy to add new features
- Clear patterns for new developers
- Atomic design principles

### **3. Maintainability**
- Related files grouped together
- Consistent naming conventions
- Clear import paths

### **4. Developer Experience**
- Intuitive file locations
- Better IDE support
- Easier refactoring

## 🚀 **Implementation Steps**

1. **Run Migration Script**: Execute `./migrate-structure.sh`
2. **Update Import Paths**: Use find/replace to update all imports
3. **Update tsconfig.json**: Add path mappings for new structure
4. **Update Storybook**: Reorganize stories to match new structure
5. **Test Application**: Ensure everything works correctly
6. **Update Documentation**: Update README and development guides

## 📝 **Path Mapping Updates**

Update `tsconfig.json` with new path mappings:
```json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["./src/shared/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/providers/*": ["./src/providers/*"]
    }
  }
}
```

## ✅ **Success Metrics**

- [ ] All components properly categorized by atomic design
- [ ] Features properly isolated and organized
- [ ] Shared resources consolidated
- [ ] Import paths updated and working
- [ ] TypeScript compilation successful
- [ ] Application builds and runs correctly
- [ ] Storybook stories updated and working
