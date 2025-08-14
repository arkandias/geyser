# Contributing to Geyser

Thank you for your interest in contributing to Geyser!
This guide will help you get started with the development environment and contribution workflow.

## Prerequisites

### System Requirements

- Linux or macOS

### Required Software

- Node.js 24 &ndash; The project requires Node.js version 24 exactly
- pnpm 10 &ndash; Package manager (pnpm version 10 is required)
- Git &ndash; For version control
- Docker &ndash; Required for running database and other services in development

## Getting Started

### 1. Fork and Clone the Repository

1. Fork the repository on GitHub
2. Clone your fork locally:

```shell
git clone https://github.com/<your-username>/geyser.git
cd geyser
```

### 2. Install Dependencies

The project uses pnpm as the package manager.
Install dependencies for all packages:

```shell
pnpm install
```

### 3. Environment Setup

Create local environment files:

```shell
cp .env .env.local

# Client environment for local development
cp client/.env client/.env.local

# Server environment for local development
cp server/.env server/.env.local
```

Edit these files according to your local setup requirements.

## Development Workflow

### Project Structure

This is a monorepo with three main packages:

- `client/` - Vue.js frontend application (Vite + TypeScript)
- `server/` - NestJS backend API (Node.js + TypeScript)
- `shared/` - Shared types and utilities

### Available Scripts

From the root directory:

```shell
# Build all packages
pnpm run build

# Run tests for all packages
pnpm run test

# Type checking for all packages
pnpm run typecheck

# Format code with Prettier
pnpm run format

# Check formatting
pnpm run format:check

# Lint code with ESLint
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Run all validation checks (format, test, typecheck, lint)
pnpm run validate
```

### Development Environment

The project is designed to run in development mode with Docker containers for services (database, etc.)
and local development servers for the client and server.

#### Setting up Development Environment

1. Set development mode: `GEYSER_ENV=development` (in `.env.local`)

2. Start containerized services:
   ```shell
   ./scripts/geyser start
   ```

#### Running the Client (Frontend)

Navigate to the client directory and start the development server:

```shell
cd client

# Start Vite development server with HMR at http://localhost:5173
pnpm run dev

# Or build and preview production build at http://localhost:4173
pnpm run build
pnpm run preview
```

#### Running the Server (Backend)

Navigate to the server directory and start the API server:

```shell
cd server

# Development mode with auto-restart on file changes
pnpm run start:dev

# Or production mode
pnpm run start
```

The API server will be available at `http://localhost:3000`.

### Code Quality and Standards

#### TypeScript

- The project uses strict TypeScript configuration
- All code must pass type checking: `pnpm run typecheck`
- Avoid `any` and type assertions when possible

#### Formatting

- Prettier is used for code formatting
- Configuration includes automatic import sorting via `@trivago/prettier-plugin-sort-imports`
- Format your code before committing: `pnpm run format`

#### Linting

- ESLint with TypeScript and Vue plugins
- Strict configuration with additional style rules
- Fix linting issues: `pnpm run lint:fix`

#### Testing

- Vitest for unit testing (client only)
- Tests should be written for new features and bug fixes
- Run tests: `pnpm run test`

### Git Workflow

#### Branch Naming

Use descriptive branch names:

- `feature/add-user-authentication`
- `fix/database-connection-issue`
- `refactor/api-error-handling`

#### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(auth): add OAuth2 integration
fix(api): resolve database timeout issues
docs(readme): update installation instructions
```

#### Before Committing

Always run validation before committing:

```shell
pnpm run validate
```

#### Pull Request Process

1. Create a feature branch from `master`
2. Make your changes following the coding standards
3. Add tests for new functionality
4. Run validation to ensure all checks pass
5. Update documentation if needed
6. Submit a pull request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes

## Development Services

When running in development mode, these services are available:

- **Frontend** (Vite): `http://localhost:5173`
- **Backend** (NestJS): `http://localhost:3000`
- **Hasura**: `http://localhost:8080`
- **Database** (PostgreSQL): `http://localhost:5432`
- **Keycloak**: `http://localhost:8081`
- **Keycloak database** (PostgreSQL): `http://localhost:5433`

## Continuous Integration

The project uses GitHub Actions for CI/CD:

- **Format checking** with Prettier
- **Testing** with Vitest
- **Type checking** with TypeScript
- **Linting** with ESLint
- **Docker builds** for releases

All checks must pass before merging pull requests.

## Package-Specific Development

### Client Package (Vue.js)

```shell
cd client

# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run tests
pnpm run test

# Generate GraphQL types
pnpm run codegen
```

### Server Package (NestJS)

```shell
cd server

# Development with auto-reload
pnpm run start:dev

# Production mode
pnpm run start

# Build
pnpm run build
```

### Shared Package

```shell
cd shared

# Build shared types and utilities
pnpm run build
```

## Getting Help

- **Issues**: Check existing issues or create a new one on GitHub
- **Documentation**: Check the [README.md](README.md)

## License

By contributing to Geyser, you agree that your contributions will be licensed under the AGPL-3.0-only.

---

Thank you for contributing to Geyser! 🚀
