# Current Folder Analysis & Migration Mapping

## Current Structure Analysis

### Components Folder (src/components/)
```
components/
├── ClientProviders.tsx          → providers/
├── emptystate/                  → shared/components/ui/molecules/
├── feedback/                    → shared/components/ui/molecules/
├── form/                       → features/forms/components/
├── i18n/                       → shared/i18n/
├── inputs/                     → shared/components/ui/molecules/
├── loading/                    → shared/components/ui/atoms/
├── LoadingSpinner.tsx          → shared/components/ui/atoms/
├── organisms/                  → shared/components/ui/organisms/
├── table/                     → features/data-table/components/
├── testing/                   → __tests__/
├── theme/                     → styles/themes/
└── ui/                        → shared/components/ui/atoms/
```

### Shared Folder (src/shared/)
```
shared/
├── components/                 → Keep, reorganize subfolders
│   ├── ErrorBoundary.tsx      → shared/components/ui/molecules/
│   ├── README.md              → Keep
│   ├── sentry/                → lib/external/
│   ├── seo/                   → shared/utils/
│   ├── ui/                    → Merge with components/ui/
│   └── utils/                 → shared/utils/
```

### Other Folders
```
app/                           → Keep as-is (Next.js App Router)
config/                        → shared/config/
features/                      → Use for feature organization
hooks/                         → Distribute between shared/hooks/ and features/
i18n/                          → shared/i18n/
layouts/                       → shared/components/layout/
lib/                           → Keep, add subfolders
providers/                     → Keep, consolidate
query/                         → lib/api/
state/                         → features/ or shared/state/
stories/                       → Reorganize to match new structure
templates/                     → features/ or shared/components/
test/                          → __tests__/
theme/                         → styles/themes/
types/                         → shared/types/
```

## Recommended Atomic Design Classification

### Atoms (Basic building blocks)
- Avatar.tsx
- Badge.tsx
- Button.tsx
- Link.tsx
- LoadingSpinner.tsx
- PageSkeleton.tsx
- TextField.tsx
- Tooltip.tsx

### Molecules (Simple combinations)
- AsyncAutocomplete.tsx
- ConfirmDialog.tsx
- EmptyErrorState.tsx
- FileUploader.tsx
- FormErrorBanner.tsx
- FormActions.tsx
- FormRow.tsx
- FormSection.tsx
- LanguageSwitcher.tsx
- MaskedField.tsx
- SearchField.tsx
- Select.tsx
- ToastProvider.tsx

### Organisms (Complex components)
- DataTable.tsx
- FormLayout.tsx
- PageHeader.tsx
- All controlled form fields

## Feature-Based Organization

### features/forms/
- All form-related components
- Form validation logic
- Form helpers and utilities
- Form-specific hooks

### features/data-table/
- DataTable component
- Table utilities
- Table-specific hooks
- Table configuration

### features/dashboard/
- Dashboard-specific components
- Dashboard hooks and services

### features/auth/
- Authentication components
- Auth hooks and services
- Auth types and utilities
