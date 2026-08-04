# UIGen

AI-powered React component generator with live preview, persistent projects, and magic-link authentication.

## Prerequisites

- Node.js 18+
- pnpm
- Neon Postgres database
- Neon Auth configured for the deployed UIGen domain
- Anthropic API key

## Environment setup

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=a-unique-random-secret-of-at-least-32-characters
ANTHROPIC_API_KEY=sk-ant-...
ENABLE_DEV_MOCK_PROVIDER=false
```

`DATABASE_URL` is used by Prisma for UIGen application data. Neon Auth maintains identity and provider-session records separately in Neon’s auth schema.

`JWT_SECRET` signs UIGen’s own secure session cookie after Neon confirms the user. Use the same secret locally and in the matching Vercel environment only when you intentionally want those deployments to accept the same application sessions. Rotating it signs out sessions created with the prior value.

`ANTHROPIC_API_KEY` is required for real generation. `ENABLE_DEV_MOCK_PROVIDER` defaults to `false`, may only be enabled in development or tests, and is rejected in production.

Do not commit `.env` or any real secret.

## Install and initialize

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
```

For a local development database where creating migrations is intentional, use Prisma’s development migration workflow instead of `migrate deploy`.

> Do not run `npm audit fix` or an equivalent forced dependency rewrite. Dependencies are pinned as a compatible set. Update flagged packages deliberately and validate typecheck, lint, tests, and production build afterward.

## Development

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Production validation

```bash
pnpm typecheck
pnpm lint
pnpm test --run
pnpm build
```

Plain `pnpm test` starts Vitest watch mode. Use `pnpm test --run` for a one-time pass in release checks and CI.

## Authentication flow

1. A visitor can begin work anonymously.
2. The visitor requests a Neon magic link.
3. Neon returns the browser to `/auth/complete` on the UIGen domain.
4. UIGen waits for the Neon provider session, resolves the application user by stable email identity, creates its signed application session, and restores the pending workspace.
5. Registered users retain persistent projects in Neon Postgres.

The production domain and callback URL configured in Neon and Vercel must agree. Cookie-secret changes require a new deployment before production functions and middleware use the new value.

## Usage

1. Continue anonymously or sign in with a magic link.
2. Describe the React component or interface you want in the chat.
3. Review generated output in the live preview.
4. Open Code view to inspect or edit the virtual files.
5. Continue iterating with the AI.
6. Export the generated code when ready.

## Features

- AI-powered React generation using Anthropic Claude
- Live preview with hot reload
- Virtual file system with validated edit tools
- Syntax highlighting and code editor
- Anonymous-work preservation through sign-in
- Persistent projects for registered users
- Exportable generated code

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- Neon Postgres and Neon Auth
- Anthropic Claude
- Vercel AI SDK
