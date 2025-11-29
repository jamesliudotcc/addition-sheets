# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all app code; `components/` contains the worksheet renderers (e.g., `AdditionOrSubtraction.tsx`, `Multiplication.tsx`), `constants.ts` centralizes shared values, and `assets/` stores static SVGs and styling helpers.
- `public/` is copied verbatim to `dist/public` during builds; place externally referenced files here.
- `index.html` is the Vite entry scaffold; `vite.config.ts` and `tsconfig.*.json` define bundling and TypeScript boundaries.
- Generated output lives in `dist/` after builds; do not commit it.

## Build, Test, and Development Commands
- `bun install` to hydrate dependencies.
- `bun run dev` starts the hot-reload dev server from `src/main.tsx`.
- `bun run build` produces a minified browser bundle in `dist/` and copies `index.html` plus `public/`.
- `bun run preview` serves the built bundle from `dist/` for manual smoke checks.
- `bun run lint` runs Biome checks across the repo.

## Coding Style & Naming Conventions
- Language: TypeScript + React 19; prefer function components with hooks and minimal state.
- Formatting and linting: Biome (`bun run lint`) is the source of truth; keep 2-space indentation and trailing commas where Biome applies them.
- Components and hooks use `PascalCase` and `useCamelCase`; props and local variables use `camelCase`.
- Styles: favor co-located CSS modules (see `Multiplication.module.css`) and keep shared layout rules in `App.css`/`index.css`.
- Keep components pure and pass data via props rather than globals.

## Testing Guidelines
- No automated test suite is present yet; add targeted tests when modifying logic-heavy components (e.g., worksheet generators).
- Prefer Vitest + Testing Library; place specs under `src/__tests__/` or alongside components as `*.test.tsx`.
- Aim for fast unit coverage of generators and rendering helpers; include at least one smoke test per new component.
- Run any added tests via `bun test` (add the script when the framework is installed).

## Commit & Pull Request Guidelines
- Commit messages follow short, imperative summaries (repo history examples: “Fix bun build”, “Cleanup multiplication CSS”); keep bodies for rationale and edge cases.
- Each PR should include: scope description, before/after notes for UI changes (with screenshots when relevant), and links to related issues/tasks.
- Keep diffs small and focused; add lint/test output or manual checklists in the PR description.
