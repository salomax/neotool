# Contributing

Thanks for contributing! This repo keeps a **single source of truth** for UI and patterns.

## Development

```bash
cd web
npm i
npm run storybook
npm test
```

## Code Style

- Language: **English** for code/comments/docs.
- Lint: ESLint + TypeScript + a11y + import order.
- Format: Prettier.

Run:

```bash
npm run lint
npm run format
npm run typecheck
```

## Commits & PRs

- Use **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
- Open a PR with a succinct description and screenshots for UI changes.
- Add/Update stories when adding components.

## Storybook & Visual Review

- CI builds Storybook (`build-storybook`).
- Optional: **Chromatic** for visual regression (set `CHROMATIC_PROJECT_TOKEN` secret).

## Testing

- Use **Vitest** + Testing Library for units.
- Keep DOM queries accessible (`getByRole`, `getByLabelText`).

## i18n

- Default: `en-US`. Keep UI strings in i18n where applicable.
- Docs in **English**.

## Directory Conventions

- `src/components/ui/*` – Atoms/primitives
- `src/components/organisms/*` – Complex components
- `src/templates/*` – Page templates
- `src/stories/*` – MDX docs
