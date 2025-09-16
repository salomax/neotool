# Folder Structure Migration Plan

## Current Issues
- Inconsistent component organization (atomic design vs feature-based)
- Duplicate concerns (components/ and shared/components/)
- Scattered related files
- Empty features folder not being utilized
- Mixed concerns (business logic with UI)
- Inconsistent naming conventions
- Stories scattered throughout

## Target Structure

```
src/
├── app/                          # Next.js App Router (keep as-is)
├── features/                     # Feature-based organization
│   ├── forms/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── data-table/
│   ├── dashboard/
│   └── auth/
├── shared/                       # Truly shared utilities
│   ├── components/
│   │   ├── ui/                   # Atomic design components
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   └── layout/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   └── config/
├── lib/                          # External library integrations
├── providers/                    # React context providers
├── styles/                       # Global styles and themes
└── __tests__/                    # Global test utilities
```

## Migration Steps

### Step 1: Consolidate UI Components
- Move `components/ui/*` → `shared/components/ui/atoms/`
- Move `components/organisms/*` → `shared/components/ui/organisms/`
- Move `components/inputs/*` → `shared/components/ui/molecules/`
- Move `components/loading/*` → `shared/components/ui/atoms/`
- Move `components/feedback/*` → `shared/components/ui/molecules/`

### Step 2: Organize by Features
- Move `components/form/*` → `features/forms/components/`
- Move `components/table/*` → `features/data-table/components/`
- Move `components/emptystate/*` → `shared/components/ui/molecules/`

### Step 3: Consolidate Shared Resources
- Move `shared/utils/*` → `shared/utils/`
- Move `shared/types/*` → `shared/types/`
- Move `config/*` → `shared/config/`
- Move `i18n/*` → `shared/i18n/`
- Move `theme/*` → `styles/themes/`

### Step 4: Organize Hooks
- Move `hooks/*` → `shared/hooks/` (for shared hooks)
- Move feature-specific hooks to respective feature folders

### Step 5: Consolidate Providers
- Move `providers/*` → `providers/`
- Move `query/*` → `lib/api/`

### Step 6: Clean Up
- Remove empty folders
- Update all import paths
- Create barrel exports
- Update Storybook stories

## Benefits
- Clear separation of concerns
- Easier to find related files
- Better scalability
- Consistent naming
- Atomic design principles
- Feature-based organization
