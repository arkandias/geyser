# Geyser client

_A Vue.js client for Geyser_

1. [Installation](#installation)
2. [Package scripts](#package-scripts)
3. [Environment variables](#environment-variables)
4. [Contact](#contact)
5. [License](#license)

## Installation

This project uses `pnpm` as the package manager. If you haven't installed `pnpm`, you can do so by running the install
script (for POSIX systems):

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

After installing `pnpm`, you can install the project dependencies by running

```shell
pnpm i
```

## Package scripts

The following pnpm scripts are available:

- Launch the development server with hot module replacement (HMR)

```shell
pnpm run dev
```

- Create an optimized production build

```shell
pnpm run build
```

- Serve the production build locally for testing

```shell
pnpm run preview
```

- Execute the test suite once

```shell
pnpm run test
```

- Run tests in watch mode for development

```shell
pnpm run test:watch
```

- Auto-fix code formatting using Prettier

```shell
pnpm run format
```

- Check code formatting without making changes

```shell
pnpm run format:check
```

- Check code for quality issues using ESLint

```shell
pnpm run lint
```

- Auto-fix ESLint issues where possible

```shell
pnpm run lint:fix
```

- Verify TypeScript types across all source files

```shell
pnpm run typecheck
```

- Run all quality checks (types, formatting, linting, and tests)

```shell
pnpm run validate
```

- Import GraphQL schema from endpoint

```shell
pnpm run codegen:schema
```

- Generate types from GraphQL documents

```shell
pnpm run codegen:documents
```

- Run complete GraphQL code generation (both schema and documents)

```shell
pnpm run codegen
```

- Check locales translations by looking for missing and unused translation keys

```shell
pnpm run locales:check
```

## Environment variables

Environment variables can be stored in either of the following .env files:

- `.env.local`
- `.env.development` and `.env.development.local` (development mode)
- `.env.production` and `.env.production.local` (production mode)

The following environment variables are used by the client.

| Environment variable       | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `VITE_BUILD_VERSION`       | Build version (shown in top-left corner)               |
| `VITE_GRAPHQL_URL`         | GraphQL engine URL                                     |
| `VITE_AUTH_URL`            | Keycloak authentication server URL                     |
| `VITE_BYPASS_AUTH`         | Bypass Keycloak auth in development (if set to `true`) |
| `VITE_HASURA_ADMIN_SECRET` | Hasura admin secret (when bypassing Keycloak)          |
| `VITE_HASURA_USER_ID`      | Hasura user ID (when bypassing Keycloak)               |

## Contact

For questions, suggestions, or bug reports, contact Julien Hauseux <[julien.hauseux@univ-lille.fr](mailto:julien.hauseux@univ-lille.fr)>.

## License

Licensed under GNU AGPL v3.0 &ndash; see [LICENSE](../LICENSE).
