# todo-next

A Todo application project for learning and experimentation.

## Requirements

- Nix with flakes enabled

## Usage

### Setup

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Set up your database connection in `.env.development.local`:

```bash
DATABASE_URL="mysql://user:password@localhost:3306/todo"
```

3. Initialize the database:

```bash
pnpm prisma db push
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Features

- User authentication with NextAuth.js
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Search and filter todos
- CSV import/export functionality

## Development

### Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run oxlint
pnpm lint:fix     # Fix linting issues
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm coverage     # Generate test coverage
pnpm prisma       # Run Prisma CLI commands
```

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Radix UI, Tailwind CSS
- **Database**: Prisma + MySQL
- **Auth**: NextAuth.js
- **Testing**: Vitest, Testing Library
- **Linting**: oxlint
- **Type Safety**: TypeScript

### Project Structure

```
src/
├── app/
│   ├── api/auth/         # NextAuth API routes
│   ├── dashboard/        # Todo dashboard
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/ui/        # Reusable UI components
├── lib/                  # Utilities and configurations
└── providers/            # React context providers

prisma/
└── schema.prisma         # Database schema
```
