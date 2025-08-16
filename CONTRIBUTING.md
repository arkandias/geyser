# Contributing to Geyser

Thank you for your interest in contributing to Geyser!
This guide will help you get started with the development environment and contribution workflow.

## Prerequisites

### System Requirements

- **Operating System:** Linux or macOS (Windows may function but is not officially supported)
- **Memory:** 8 GB of RAM
- **Storage:** 10 GB of free disk space

### Required Software

- **Git** &ndash; Version control
- **Node.js** &ndash; JavaScript runtime (version 24 required)
- **pnpm** &ndash; Package manager (version 10 required)
- **Docker Engine** &ndash; Container platform (version 25.0+ with Compose V2)
- **Hasura CLI** &ndash; GraphQL management tool

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

## Project Overview

### Project Structure

This is a monorepo with the following structure:

#### Main packages

- `client/` &ndash; Vue.js frontend application (Vite + TypeScript)
- `server/` &ndash; NestJS backend API (Node.js + TypeScript)
- `shared/` &ndash; Shared types and utilities

#### Configuration and infrastructure

- `.github/` &ndash; GitHub Actions workflows and configuration
- `.husky/` &ndash; Git hooks for code quality enforcement
- `.idea/` &ndash; JetBrains IDE configuration and settings
- `cli/` &ndash; Administration CLI (the `geyser` script and its `lib/` directory)
- `docs/` &ndash; Documentation
- `deploy/` &ndash; Deployment and infrastructure configuration
- `hasura/` &ndash; GraphQL schema, migrations, and metadata
- `keycloak/` &ndash; Authentication server configuration
- `nginx/` &ndash; Nginx configuration for production
- `scripts/` &ndash; Utility scripts (standalone automation scripts)

#### Runtime directories (created automatically)

- `backups/` &ndash; Database backup files
- `keycloak/backups/` &ndash; Keycloak realm and user backups
- `certs/` &ndash; SSL/TLS certificates
- `keys/` &ndash; Cryptographic keys
- `logs/` &ndash; Application and service logs

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

# Install Git hooks (runs automatically after pnpm install)
pnpm run prepare
```

## Development Environment

In development mode, core services (databases, Hasura, Keycloak) run in Docker containers while the client and server
run locally for faster iteration.

### Setting up Development Environment

1. Set development mode (in `.env.local`): `GEYSER_ENV=development`

2. Start containerized services:

   ```shell
   cli/geyser start
   ```

3. The following services will be available:
   - **Hasura**: `http://localhost:8080`
   - **Database** (PostgreSQL): `http://localhost:5432`
   - **Keycloak**: `http://localhost:8081`
   - **Keycloak database** (PostgreSQL): `http://localhost:5433`

### Build the Shared Package

The shared package contains types and utilities used by both the client and server.
Build it before starting development and after making changes:

```shell
pnpm --filter shared run build
```

### Serving the Web Client

#### Development server

Start the development server with hot module reloading:

```shell
pnpm --filter client run dev
```

The development server will be available at `http://localhost:5173`.

#### Preview production build

Alternatively, you can build the client and preview the production build:

```shell
pnpm --filter client run build
pnpm --filter client run preview
```

The build will be served at `http://localhost:4173`.

### Running the API Server

Start the API server in development mode with auto-restart on file changes:

```shell
pnpm --filter server run start:dev
```

Or start the API server in production mode:

```shell
pnpm --filter server run start
```

The API server will be available at `http://localhost:3000`.

## Code Quality and Standards

### TypeScript

- The project uses strict TypeScript configuration
- All code must pass type checking: `pnpm run typecheck`
- Avoid `any` and type assertions when possible

### Formatting

- Prettier is used for code formatting
- Configuration includes import sorting via `@trivago/prettier-plugin-sort-imports`
- Format your code before committing: `pnpm run format`

### Linting

- ESLint with TypeScript and Vue plugins
- Strict configuration with additional style rules
- Fix linting issues: `pnpm run lint:fix`

### Testing

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

#### Git Hooks

The project includes Git hooks to enforce code quality and consistency:

**Pre-push Hook (Version Tag Validation):**

- Automatically validates that version tags match the `VERSION` file
- Prevents pushing mismatched version tags (e.g., tag `v1.2.3` must match `VERSION` file content `1.2.3`)
- Runs automatically when pushing tags matching pattern `v[major].[minor].[patch][-prerelease]`

**Note:** This ensures version consistency between Git tags and the project's VERSION file, which is critical for the release process.

## Contribution Process

### Pull Request Process

1. Create a new branch from `master`
2. Make your changes following the coding standards
3. Add tests for new functionality
4. Run validation to ensure all checks pass
5. Update documentation if needed
6. Submit a pull request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes

### Continuous Integration

The project uses GitHub Actions for CI/CD:

- Format checking with Prettier
- Testing with Vitest
- Type checking with TypeScript
- Linting with ESLint
- Docker builds for releases

All checks must pass before merging pull requests.

## Package-Specific Development

### Shared Package

#### Available Scripts

```shell
cd shared

# Build shared types and utilities
pnpm run build

# Type checking
pnpm run typecheck
```

### Client Package (Vue.js)

#### Environment Variables

The following environment variables can be defined in `client/.env` and `client/.env.local` (the latter takes precedence).

| Environment Variable    | Default Value | Description                                                                                                        |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `VITE_BUILD_VERSION`    | `NULL`        | The version name (build argument only)                                                                             |
| `VITE_API_URL`          | **Required**  | Base URL of the API endpoint                                                                                       |
| `VITE_GRAPHQL_URL`      | **Required**  | URL of the GraphQL API endpoint (typically `${VITE_API_URL}/graphql`)                                              |
| `VITE_TENANCY_MODE`     | `single`      | Tenancy mode [`single`/`multi`], see [Multi-tenant Mode](README.md#multi-tenant-mode)                              |
| `VITE_BASE_DOMAIN`      | `NULL`        | Required for multi-tenant mode, see [Multi-tenant Mode](README.md#multi-tenant-mode)                               |
| `VITE_ORGANIZATION_KEY` | `NULL`        | Organization identifier (defaults to `default` in single-tenant mode, derived from subdomain in multi-tenant mode) |
| `VITE_BYPASS_AUTH`      | `false`       | Bypasses Keycloak authentication (development only)                                                                |
| `VITE_ADMIN_SECRET`     | `NULL`        | API admin secret for authentication bypass (development only, required when `VITE_BYPASS_AUTH=true`)               |

#### Available Scripts

```shell
cd client

# Development server with HMR
pnpm run dev

# Build client for production
pnpm run build

# Preview production build
pnpm run preview

# Run Vitest
pnpm run test

# Run Vitest in watch mode
pnpm run test:watch

# Type checking
pnpm run typecheck

# Generate types from GraphQL schema and documents
pnpm run codegen

# Generate GraphQL schema file schema.graphql (needs to connect to Hasura)
pnpm run codegen:schema
```

### Server Package (NestJS)

#### Environment Variables

The following environment variables can be defined in `server/.env` and `server/.env.local` (the latter takes precedence).

| Environment Variable               | Default Value      | Description                                                                                                            |
| ---------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `API_NODE_ENV`                     | `development`      | Node.js environment mode [`development`/`production`]                                                                  |
| `API_PORT`                         | `3000`             | Port number for the HTTP server                                                                                        |
| `API_URL`                          | **Required**       | Public URL where the API is accessible (must use HTTPS in production)                                                  |
| `API_ORIGINS`                      | **Required**       | Comma-separated list of allowed origins for CORS policy (supports regex patterns)                                      |
| `API_ADMIN_SECRET`                 | **Required**       | Admin secret for bypassing JWT authentication                                                                          |
| `API_DATABASE_URL`                 | **Required**       | PostgreSQL database connection string (format: `postgresql://user:password@host:port/dbname`)                          |
| `API_GRAPHQL_URL`                  | **Required**       | GraphQL Engine endpoint URL                                                                                            |
| `API_GRAPHQL_ADMIN_SECRET`         | **Required**       | Admin secret for GraphQL Engine access                                                                                 |
| `API_GRAPHQL_TIMEOUT_MS`           | `30000` (30s)      | Request timeout for GraphQL operations (in milliseconds)                                                               |
| `API_OIDC_DISCOVERY_URL`           | **Required**       | OpenID Connect discovery endpoint URL for the identity provider                                                        |
| `API_OIDC_CLIENT_ID`               | **Required**       | OAuth2/OIDC client identifier for authentication                                                                       |
| `API_OIDC_CLIENT_SECRET`           | **Required**       | OAuth2/OIDC client secret                                                                                              |
| `API_JWT_ACCESS_TOKEN_MAX_AGE_MS`  | `3600000` (1h)     | Maximum lifetime for JWT access tokens (in milliseconds)                                                               |
| `API_JWT_REFRESH_TOKEN_MAX_AGE_MS` | `604800000` (7d)   | Maximum lifetime for JWT refresh tokens (in milliseconds)                                                              |
| `API_JWT_STATE_EXPIRATION_TIME_MS` | `300000` (5m)      | OAuth login state expiration time for CSRF protection (in milliseconds)                                                |
| `API_KEYS_ALGORITHM`               | `EdDSA`            | Algorithm for signing JWTs [`Ed25519`/`EdDSA`/`ES256`/`ES384`/`ES512`/`PS256`/`PS384`/`PS512`/`RS256`/`RS384`/`RS512`] |
| `API_KEYS_MODULUS_LENGTH_RSA`      | `2048`             | Modulus length in bits for RSA algorithms (`PS*`/`RS*` only). Common values: `2048`, `3072`, `4096`                    |
| `API_KEYS_ROTATION_INTERVAL_MS`    | `604800000` (7d)   | How often new signing keys are generated and the current active key is deprecated (in milliseconds)                    |
| `API_KEYS_EXPIRATION_TIME_MS`      | `2419200000` (28d) | How long a key remains available for JWT verification from the moment it's created (in milliseconds)                   |

#### Available Scripts

```shell
cd server

# Build server
pnpm run build

# Build and start server
pnpm run start

# Start with live-reload (automatically recompiles on file changes)
pnpm run start:dev

# Start with debugging enabled (--inspect flag for IDE connection)
pnpm run start:debug

# Start production build (requires build first)
pnpm run start:prod

# Type checking
pnpm run typecheck
```

## Getting Help

- **Bug Reports**: Check [existing issues](https://github.com/arkandias/geyser/issues) or create a new one
- **Documentation**: See [README.md](README.md) for installation and configuration

## License

By contributing to Geyser, you agree that your contributions will be licensed under the GNU Affero GPL v3.

---

Thank you for contributing to Geyser! 🚀
