# Beacon Client

Dashboard for [Beacon](../beacon-server) — the self-hosted error tracker. React + Vite, styled with Stitches, kept in continuous type sync with the NestJS backend via Kubb.

## Stack & conventions

- **Routing**: `react-router-dom`.
- **Styling**: `@stitches/react` with a single theme source (`src/theme`), light/dark tokens, no inline styles.
- **Forms**: `react-hook-form` + `zod` resolvers. Every form has a co-located `dto.ts` with its Zod schema.
- **HTTP**: one configured `axios` instance (`src/config/api.ts`) — auth header injection and 401 handling live there, nowhere else.
- **API sync**: **Kubb** generates typed request functions, TypeScript types and Zod response/request schemas straight from the backend's OpenAPI document (`npm run generate:api`). Nothing in `src/api/generated` is hand-written — never edit it, regenerate it.
- **Feedback**: `react-hot-toast` for error/success toasts.
- **No `any`**: `@typescript-eslint/no-explicit-any` is an error in `eslint.config.js`. Reach for `unknown` + narrowing instead; an escape hatch should be rare and justified.
- **Folder shape**: co-location. A component/page folder holds `index.tsx`, `index.styles.ts` (Stitches) and, where relevant, `dto.ts` (Zod) — no scattered `styles/` or `types/` trees.

```
src/
  config/       api.ts (axios instance), env.ts (typed import.meta.env), kubb-client.ts (adapter Kubb calls through)
  api/generated/  Kubb output — gitignored, regenerate with `npm run generate:api`
  theme/        Stitches config, color/space/font tokens (light + dark), global styles
  routes/       router + the auth guard
  features/     one folder per domain (auth, systems, issues, dashboard), each owning its
                components, hooks and dto.ts
  pages/        route-level screens that compose features inside the app shell layout
  components/   shared UI (components/ui) and the app shell (components/layout)
  lib/          small cross-cutting helpers (error message extraction, date formatting, auth storage)
  test/         Vitest setup (jest-dom matchers)
```

## Getting started

The backend must be running first (Kubb reads its live OpenAPI document to generate the client).

```bash
# in beacon-server/
npm run start:dev

# in beacon-client/
npm install
cp .env.example .env
npm run generate:api   # generates src/api/generated from http://localhost:3000/api/docs-json
npm run dev            # http://localhost:5173
```

Log in with a user created via `beacon-server`'s `npm run seed:admin`.

**Whenever the backend's API contract changes** (new endpoint, new field, renamed DTO), re-run `npm run generate:api` with the backend up — that's the "continuous sync" the project is built around. `src/api/generated` is gitignored on purpose, since it's a build artifact of the backend's current contract, not source: every clone/CI run must run `generate:api` before `build`/`dev`.

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:3000` | Base URL of the beacon-server API. Used both by the app (`src/config/api.ts`) and by `kubb.config.ts` to fetch the OpenAPI document. |

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run generate:api` | Regenerate `src/api/generated` from the backend's live OpenAPI schema |
| `npm run lint` | ESLint (flat config, includes the no-`any` and react-hooks rules) |
| `npm run format` | Prettier write |
| `npm run test` / `test:watch` | Component tests (Vitest + Testing Library, jsdom) |

## Pages

- **Login** — e-mail/password against the backend's JWT auth.
- **Visão geral (Dashboard)** — KPI stat tiles, a 7-day events bar chart and top error types, all from `GET /kpis/overview`.
- **Sistemas** — read-only for everyone; only `admin` sees the create form and the rotate/delete actions. Create a system (choosing its retention policy), see its API key **once** on creation.
- **Issues** — filterable by system/status/level, paginated (25 per page). Click through to an issue's detail, its recent raw events (stack trace, tags, extra context) and resolve/ignore/reopen actions — hidden for `viewer`.
- **Usuários** — `admin` only (redirects everyone else). Create a dashboard user (auto-generated temporary password, shown **once**, same reveal pattern as a system's API key), change a role, reset a password, remove a user.

## Roles & the UI

The dashboard mirrors the backend's three roles (see beacon-server's README for the full permission matrix): `admin`, `member`, `viewer`. `AuthProvider` (`src/features/auth/auth-context.tsx`) exposes `hasRole(...roles)`, which every role-sensitive piece of UI (nav links, the systems create form and its row actions, the issue resolve/ignore buttons, the whole `/users` route via `RequireRole`) checks directly — there's no separate "permissions" data layer to keep in sync. On load, `AuthProvider` calls `GET /auth/me` to revalidate the cached session instead of trusting whatever role was stored at login time, so a role change or account removal made elsewhere shows up on the next page load (and immediately on the next API call, since the backend rejects the token outright).

## Dark mode

`src/theme/theme-mode.ts` is a small hook — no context needed, since only `AppShell` renders the toggle — that reads the saved preference from `localStorage` (falling back to `prefers-color-scheme`) and applies Stitches' `darkTheme` class to `<html>` (not a wrapper `div`, so toasts and any future portal inherit it too). Click the sun/moon button next to the user's e-mail in the top bar.

## Notes on the Kubb wiring

`kubb.config.ts` points at `${VITE_API_URL}/api/docs-json` and runs four plugins in sequence: `plugin-oas` (parses the spec) → `plugin-ts` (types) → `plugin-zod` (runtime schemas) → `plugin-client` (the actual `async function` per endpoint). The client plugin is configured with `parser: 'zod'`, so every generated call both validates its request body and parses its response through the matching Zod schema — a wrong/changed backend shape fails loudly in development instead of silently shipping bad data to a component.

Generated calls don't build their own Axios instance — `importPath: '@/config/kubb-client'` routes every one of them through our single configured `apiClient` (`src/config/api.ts`), so auth headers and 401-handling apply uniformly whether the call was hand-written or generated.

`GET /issues` returns a paginated envelope (`{ items, total, page, pageSize }`) rather than a bare array — `features/issues/hooks/use-issues.ts` and `pages/issues-page` are the two places that shape is unpacked; a `Pager` (`components/ui/pager`) drives `page` through the URL's `?page=` query param.

## Testing

Component tests use Vitest + `@testing-library/react` in `jsdom`, not a full browser — they cover representative pieces rather than every file: pure helpers (`lib/get-error-message.spec.ts`, `lib/format-date.spec.ts`), a UI primitive (`components/ui/button/index.spec.tsx`), a form's validation + submit flow (`features/auth/login-form/index.spec.tsx`, mocking the generated API call so no network is involved), and a list's rendering/navigation (`features/issues/issue-list/index.spec.tsx`). Run with `npm run test`.

For full end-to-end confidence (real backend, real browser), boot both `beacon-server` and `beacon-client` and drive it with Playwright or by hand — there's no automated browser-level suite in this repo yet.
