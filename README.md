# Geyser

<img src="logo.svg" alt="Geyser logo" width="500">

## Getting Started

### Installation

Install Geyser using one of the following commands:

```shell
# Using curl
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh | env GEYSER_VERSION=2.0 sh -

# Using wget
wget -qO- https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh | env GEYSER_VERSION=2.0 sh -
```

This will create a the installation directory `geyser` in your working directory.

### Dependencies

#### Required Dependencies

- **Docker Engine v25.0 or later**
    - Required for container management
    - Must be running with Docker Compose V2 support
    - User must have permissions to run Docker commands

- **Hasura CLI**
    - Required for managing Hasura metadata and migrations
    - Used by administration scripts
    - Installation: `curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`

#### Optional Dependencies

- **jq**
    - Required for Keycloak synchronization
    - Used to process JSON in administration scripts
    - Installation: `sudo apt install jq` (Ubuntu) or `brew install jq` (macOS)

- **Oh My Zsh**
  TODO

### Autocomplete

## Configuration

### Environment Variables

The following environment variables are required.

| Environment variable          | Explanation                                                                                                               |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `POSTGRES_PASSWORD`           | Password for the PostgreSQL role `postgres` in the Geyser database (superuser)                                            |
| `POSTGRES_KC_PASSWORD`        | Password for the PostgreSQL role `postgres` in the Keycloak database (superuser)                                          |
| `KEYCLOAK_ADMIN_PASSWORD`     | Password for the initial admin user `admin` in the Keycloak container                                                     |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Admin secret for Hasura GraphQL Engine                                                                                    |
| `SERVER_HOST`                 | The hostname and, optionally, the port number at which the web app will be served (e.g., `localhost:5173`, `example.com`) |

### Environment Files

Environment variables can be stored in the following env files:

- `.env`/`.env.local` (base configuration and local override)
- `.env.development`/`.env.development.local` (development mode configuration)
- `.env.production`/`.env.production.local` (production mode configuration)

**Note:** `.local` files are meant to store secrets, passwords, and other sensitive credentials that should not be
shared.

### SSL Certificates

The SSL certificates must be placed in `nginx/certs/`, see [here](nginx/certs/README.md).

## Administration

### Running Geyser

The script `scripts/geyser` provides the following commands:

- `start` to start Geyser
- `stop` to stop Geyser
- `restart` to restart Geyser
- `update` to update Geyser
- `reset` to starts a fresh configuration
- `backup` to make a backup of the databases
- `restore` to restore a backup of the databases

Use these command with one of the following options:

- `--dev` in a development environment
- `--prod` in a production/staging environment

Equivalently, you can set the environment variable `GEYSER_MODE` to `development` or `production`.

### Automatic Backups

A script is provided to automatically create a backup of Geyser and upload it to a WebDAV server (like Nextcloud).
The script can be scheduled via crontab for regular backups.

Required environment variables:

- `WEBDAV_URL`: Base URL of the WebDAV server
- `WEBDAV_USER`: WebDAV username
- `WEBDAV_PASS`: WebDAV password

These variables can be set in `.env`, `.env.local`, or directly in the environment.

Example crontab configurations:

```
# Hourly backups
0 * * * * /path/to/scripts/backup-webdav

# Daily backup at 3:00 AM
0 3 * * * /path/to/scripts/backup-webdav

# Weekly backup on Sunday at 4:00 AM
0 4 * * 0 /path/to/scripts/backup-webdav
```

## Architecture

### Overview

- **PostgreSQL Databases**
    - Main database (geyser): Stores application data
    - Keycloak database: Manages authentication
- **Keycloak**: Authentication server
- **Hasura**: GraphQL API and database access layer
- **Nginx**: Web server and reverse proxy

Here we list the various components of Geyser. Each component corresponds to a single Docker container.

### Geyser database

A PostgreSQL container is running as service `db`.
It contains a database named `geyser`, which contains the data relative to Geyser in the `public` schema, and Hasura
metadata in the `hdb_catalog` schema.
This database is accessible on the host port `5432`.

### Hasura (GraphQL Engine)

An Hasura container is running as service `hasura`.
It is connected to the Geyser database and is used by the web client to make GraphQL queries.
The GraphQL API is available at:

- http://localhost:8090/v1/graphql in development mode
- https://example.com/graphql in production mode (assuming `SERVER_HOST=example.com`)

Hasura permissions are handled by giving users some of the following roles.

In development mode, you can run `scripts/hasura console` to access the console at http://localhost:9695.

| Role       | Explanations                                          |
|------------|-------------------------------------------------------|
| `teacher`  | The base user role with restricted permissions        |
| `assigner` | Some extra permissions during the "assignments" phase |
| `admin`    | The superuser role with all permissions               |

### Keycloak

A Keycloak container is running as service `keycloak`.
It manages the authentication and the roles of the Hasura users using JWT tokens.

#### Endpoints

In development mode, Keycloak can be reached at http://localhost:8081.

In production mode, the following ports are exposed by the reverse proxy (assuming `SERVER_HOST=example.com`):

| Path          | Reverse proxy path                  |
|---------------|-------------------------------------|
| `/js/`        | https://example.com/auth/js/        |
| `/realms/`    | https://example.com/auth/realms/    |
| `/resources/` | https://example.com/auth/resources/ |

In particular, the path `/admin/` is not exposed for security reason.
You can access this endpoint using SSH Tunnel: if you connect with `ssh -L  8081:localhost:8081` to the production
server, then `/auth/` can be reached at http://localhost:8081/auth/admin.
In particular, the admin console is available at http://localhost:8081/auth/admin.

### Keycloak database

A second PostgreSQL container is running as service `kc-db`.
It contains a database named `keycloak` dedicated to the Keycloak instance.
This database is accessible on the host port `5433`.

### Nginx (production only)

In production, a custom Nginx container is running as service `web`.
It is used as a reverse proxy, and serves the web client for the app.

## Contact

For any questions, comments, suggestions for improvements, or to report any errors or possible bugs, please contact
Julien Hauseux <[julien.hauseux@univ-lille.fr](mailto:julien.hauseux@univ-lille.fr)>.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
