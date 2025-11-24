# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Next.js 15 todo application with authentication, using the App Router architecture. Built as a learning project for modern web development patterns.

## Development Commands

### Core Development
```bash
pnpm dev                # Start development server on http://localhost:3000
pnpm build              # Production build
pnpm start              # Start production server
```

### Testing
```bash
pnpm test               # Run tests once
pnpm test:watch         # Run tests in watch mode
pnpm coverage           # Generate coverage report
```

### Code Quality
```bash
pnpm lint               # Run oxlint with type checking
pnpm lint:fix           # Auto-fix linting issues
nix fmt                 # Format .nix files with nixfmt
```

### Database
```bash
pnpm prisma db push     # Push schema changes to database
pnpm prisma             # Run Prisma CLI (uses .env.development.local)
```

All `pnpm prisma` commands automatically use the `.env.development.local` file via dotenv-cli.

## Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Database**: Prisma ORM with MySQL
- **Authentication**: NextAuth.js (Google provider, JWT strategy)
- **UI**: Radix UI primitives + Tailwind CSS
- **Testing**: Vitest with Testing Library (jsdom environment)
- **Linting**: oxlint (with type-aware checking)
- **Package Manager**: pnpm (v9.15.9)

### Key Patterns

#### Server Actions Pattern
Server actions are colocated with features in `src/app/dashboard/actions/`:
- `createTodo.ts`, `getTodos.ts`, `editTodo.ts`, `deleteTodo.ts`, `toggleTodo.ts`
- All use `"use server"` directive
- Import shared Prisma client from `src/lib/prisma.ts`

#### Prisma Client Singleton
The Prisma client (`src/lib/prisma.ts:5`) is instantiated as a singleton and attached to `globalThis` in development to prevent multiple instances during hot reload.

#### Authentication Flow
- NextAuth configuration in `src/lib/auth.ts:4` exports `authOptions`
- Route handler at `src/app/api/auth/[...nextauth]/route.ts`
- Uses JWT session strategy (no database sessions)
- Google OAuth provider only (requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`)

#### Component Organization
- **UI primitives**: `src/components/ui/` - Radix UI wrappers (button, dialog, form, etc.)
- **Feature components**: `src/app/dashboard/components/` - Todo-specific components
- Dashboard page (`src/app/dashboard/page.tsx:13`) is a client component that manages todo state

### Database Schema
Two simple models in `prisma/schema.prisma`:
- `Todo`: id, title, completed, createdAt, updatedAt
- `User`: id, name, email (not yet integrated with todos)

### Environment Setup
Create `.env.development.local` with:
```
DATABASE_URL="mysql://user:password@localhost:3306/todo"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Nix Integration
- Flake provides development shell with Node.js 22 and pnpm
- Auto-generates `.mcp.json` on shell entry for Claude Code MCP servers (nixos, serena)
- CI package available via `nix build .#ci`
- Formatting via treefmt with nixfmt and biome

### Testing Configuration
Vitest config (`vitest.config.mts`) uses:
- jsdom environment for React component testing
- vite-tsconfig-paths for path resolution
- Excludes `.direnv/**` from test discovery

## Notes

- The codebase contains some Japanese text in UI labels (e.g., "タスク検索", "タスク追加")
- CSV import/export functionality exists via react-csv and react-papaparse
- TypeScript strict mode is enabled
