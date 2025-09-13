# Style Guide

## Naming

- Components: `PascalCase` (e.g., `DataTable`).
- Files: match component (e.g., `DataTable.tsx`, `DataTable.stories.tsx`).
- Tests: `Component.test.tsx` next to component or in `__tests__`.

## Imports

- Grouped and alphabetized (ESLint `import/order` enforces this).
- Use path aliases where available (e.g., `@/...`).

## React

- Function components + hooks.
- Avoid unnecessary `useEffect`; derive values from props/state.
- Prefer controlled inputs with RHF for forms.

## A11y

- Always provide accessible names/labels.
- Avoid color-only differentiation.
- Test keyboard navigation.

## CSS/Theming

- Use MUI theme for spacing/radius/colors.
- Keep ag-Grid aligned via `agGrid.overrides.css`.
