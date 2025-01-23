# Geyser

<img src="logo.svg" alt="Geyser logo" width="500">

## Table of Contents

- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Dependencies](#dependencies)
    - [Shell Completion](#shell-completion)
- [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
    - [Environment Files](#environment-files)
    - [SSL Certificates](#ssl-certificates)
- [Architecture](#architecture)
    - [Overview](#overview)
    - [Geyser Database](#geyser-database)
    - [Hasura](#hasura-graphql-engine)
    - [Keycloak](#keycloak)
    - [Keycloak Database](#keycloak-database)
    - [Nginx](#nginx-production-only)
- [Administration](#administration)
    - [Running Geyser](#running-geyser)
    - [Automatic Backups](#automatic-backups)
- [Contact](#contact)
- [License](#license)

## Getting Started

### Pre-Installation Setup

#### Docker Setup

```bash
# Install Docker Engine
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER  # Log out and back in after this 
```

#### Required Tools

```bash
# Install Hasura CLI
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Install jq (Optional, needed for Keycloak sync)
sudo apt install jq

# Oh My Zsh (for zsh users)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Installation

#### Download and Install

```shell
# Using curl
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh

# Or specify a version
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | env GEYSER_VERSION=2.0 sh
```

#### Initial Configuration

```bash
cd geyser
cp .env.example .env
```

#### Initialize the App

```bash
./scripts/geyser init
```

### Quick Start

#### Start the App

```bash
./scripts/geyser start
```

#### Access Services

```bash
./scripts/geyser hasura console
```

- Hasura Console: [http://localhost:8080](http://localhost:8080)
- Keycloak Admin: [http://localhost:8081](http://localhost:8081)
- App: [http://localhost:80](http://localhost:80)

#### Basic operations

```bash
# Stop all services
./scripts/geyser stop

# Create a backup
./scripts/geyser backup

# View logs
./scripts/geyser --log-level DEBUG start
```

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
    - Required for shell completion
    - Installation: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

## Configuration

### Environment Variables

The following environment variables are required.

| Environment variable          | Default value        | Explanation                                                                                                   |
|-------------------------------|----------------------|---------------------------------------------------------------------------------------------------------------|
| `POSTGRES_PASSWORD`           | **Required**         | Password for the PostgreSQL role `postgres` in the Geyser database (superuser)                                |
| `HASURA_GRAPHQL_ADMIN_SECRET` | **Required**         | Admin secret for Hasura GraphQL Engine                                                                        |
| `POSTGRES_KC_PASSWORD`        | Required to use auth | Password for the PostgreSQL role `postgres` in the Keycloak database (superuser)                              |
| `KEYCLOAK_ADMIN_PASSWORD`     | Required to use auth | Password for the initial admin user `admin` in the Keycloak container                                         |
| `SERVER_HOST`                 | Required to use web  | Hostname and, optionally, port number at which the app will be served (e.g., `localhost:5173`, `example.com`) |
| `MODE`                        | `development`        | Application deployment context (`development`/`production`)                                                   |
| `USE_AUTH`                    | `false`              | Enable/disable Keycloak authentication service (`true`/`false`, for development only)                         |
| `USE_WEB`                     | `false`              | Enable/disable Nginx reverse proxy frontend (`true`/`false`, for development only)                            |
| `LOG_LEVEL`                   | `INFO`               | Logging verbosity threshold (`DEBUG`/`INFO`/`WARN`/`ERROR`)                                                   |

### Environment Files

Environment variables can be stored in the following env files:

- `.env`/`.env.local` (base configuration and local override)
- `.env.development`/`.env.development.local` (development mode configuration)
- `.env.production`/`.env.production.local` (production mode configuration)

**Note:** `.local` files are meant to store secrets, passwords, and other sensitive credentials that should not be
shared.

### SSL Certificates

The SSL certificates must be placed in `nginx/certs/`, see [here](nginx/certs/README.md).

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

- http://localhost:8080/v1/graphql in development mode
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

In production, a custom Nginx container is running as service `nginx`.
It is used as a reverse proxy, and serves the web client for the app.

## Administration

### Shell completion

[//]: # (TODO)

```shell
./scripts/geyser completion
```

### Running Geyser

Geyser comes with an administration script `scripts/geyser`.

```
Geyser Administration Script v1.0.0

Usage: geyser [OPTIONS] COMMAND

Core Commands:
  init              Initialize a fresh Geyser installation
  start             Start Geyser services
  stop              Stop Geyser services
  update            Update Geyser services
  reset             Reset Geyser to a clean state

Data Operations:
  backup            Create a backup of PostgreSQL databases
  restore           Restore databases from a previous backup
  realms-export     Export Keycloak realms
  realms-import     Import Keycloak realms
  sync-keycloak     Synchronize Keycloak users with active teachers

Service Management:
  compose           Run Docker Compose with loaded configuration
  hasura            Run Hasura CLI with loaded configuration
  kc                Run Keycloak CLI in container
  kcadm             Run Keycloak Admin CLI in container

Tools:
  completion        Install completion for zsh (with oh-my-zsh)

Options:
  -h, --help        Show this help message
  -v, --version     Show version information
  --dev             Use development configuration
  --prod            Use production configuration
  --auth            Enable Keycloak authentication service in development
  --web             Enable Nginx reverse proxy frontend in development
  --log-level       Set logging level (DEBUG|INFO|WARN|ERROR)
  --configure       Configure Geyser settings

Run 'geyser COMMAND --help' for more information on a command.
```

**Note:** Some options override their counterpart environment variables:

| Option        | Environment variable | Remark                   |
|---------------|----------------------|--------------------------|
| `--dev`       | `MODE=development`   |                          |
| `--prod`      | `MODE=production`    |                          |
| `--auth`      | `USE_AUTH=true`      | In development mode only |
| `--web`       | `USE_WEB=true`       | In development mode only |
| `--log-level` | `LOG_LEVEL`          |                          |

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

## Contact

For any questions, comments, suggestions for improvements, or to report any errors or possible bugs, please contact
Julien Hauseux <[julien.hauseux@univ-lille.fr](mailto:julien.hauseux@univ-lille.fr)>.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
