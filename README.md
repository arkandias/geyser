# Geyser

<img src="logo.svg" alt="Geyser logo" width="500">

Geyser is a web application that streamlines the course assignment process in educational institutions. It manages the
complete workflow from initial teacher requests through commission decisions to final assignments. Built with
PostgreSQL, Hasura GraphQL, and Keycloak authentication, it provides a secure and efficient "Course Assignment Flow".

## Quick Start

This guide will get you a working development instance with default configuration in minutes. For production deployment
or custom configurations, see the [Configuration](#configuration) section.

### System Requirements and Dependencies

#### Core Requirements

- Linux or macOS
- Docker Engine 25.0 or later (with Docker Compose V2)
- Hasura CLI

#### Optional Tools

- jq (for Keycloak synchronization)
- Oh My Zsh (for shell completion)

#### Install Dependencies

Install Docker with Docker Compose:

```shell
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER  # Log out and back in after this
```

Install Hasura CLI:

```shell
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```

Optional tools:

```shell
# jq (needed for Keycloak sync)
sudo apt install jq

# Oh My Zsh (needed for completion - for zsh users only)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Installation

Download and install the latest version (in `~/.geyser/master`):

```shell
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh
```

Or for a specific version (in `~/.geyser/${GEYSER_VERSION}`):

```shell
export GEYSER_VERSION="1.2.3"
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh
```

### Setup

Initialize Geyser:

```shell
geyser init
```

If you get a "command not found" error, you need to add the Geyser binary to your PATH:

```shell
export PATH="$HOME/.local/bin:$PATH"
```

Add this line to your shell configuration file (e.g., `~/.bashrc` or `~/.zshrc`) to make it permanent.

Alternatively, you can use the full path to the script:

- Latest version: `~/.geyser/master/scripts/geyser`
- Specific version: `~/.geyser/${GEYSER_VERSION}/scripts/geyser`

### First start

Start all services:

```shell
geyser start
```

Available services:

- Web client: http://localhost
- Keycloak admin: http://localhost:8081
- Hasura console: `geyser hasura console`

## Configuration

### Architecture Overview

Geyser consists of the following main components:

- Frontend:
    - Single Page Application (SPA)
    - Nginx routing all external access
- Backend:
    - PostgreSQL instance storing application data
    - Hasura providing a GraphQL API
- Authentication:
    - Keycloak handling user authentication
    - Dedicated PostgreSQL database for Keycloak data

### Deployment Modes

Geyser supports two deployment modes controlled by the `MODE` environment variable:

#### Development Mode

The default mode, optimized for local development:

- Simplified configuration:
    - No SSL/TLS certificates required
    - No CORS restrictions on Hasura
- Development features:
    - Hasura Console enabled
    - Keycloak in development mode with hostname debugging

Optional feature flags:

- `NO_WEB=true`: Disable Nginx reverse proxy
    - Allows direct access to services
- `NO_AUTH=true`: Disable Keycloak authentication
    - Useful for rapid UI development
    - Automatically implies `NO_WEB=true`

#### Production Mode

Activated by setting `MODE=production`. Enforces the following security measures:

- SSL/TLS encryption required:
    - Place certificates in `nginx/certs/${GEYSER_HOSTNAME}/`:
        - `fullchain.cer`: SSL certificate chain
        - `private.key`: Private key
- Secure container configuration:
    - Optimized Keycloak image
    - Keycloak running in production mode
    - Feature flags disabled
- Restricted access:
    - CORS policy enabled for Hasura
    - Hasura console disabled
    - Keycloak hostname debug interface disabled
    - Admin interfaces non exposed by reverse proxy

### Environment Variables

#### Configuration Files

Geyser uses two environment files:

- `.env`: Base configuration file with default values
- `.env.local`: Local overrides (not version-controlled)
    - For sensitive information (passwords, secrets)
    - For environment-specific settings (hostnames, ports)

Variables in `.env.local` take precedence over those in `.env`.

#### Available Variables

| Environment variable          | Default value | Explanation                                                                               |
|-------------------------------|---------------|-------------------------------------------------------------------------------------------|
| `GEYSER_HOSTNAME`             | `localhost`   | Hostname (and optionally port number) where Geyser is served (e.g., `geyser.example.com`) |
| `MODE`                        | `development` | Deployment mode (`development`/`production`)                                              |
| `LOG_LEVEL`                   | `INFO`        | Logging threshold (`DEBUG`/`INFO`/`WARN`/`ERROR`/`SILENT`)                                |
| `NO_AUTH`                     | `false`       | Disable authentication (development only)                                                 |
| `NO_WEB`                      | `false`       | Disable Nginx proxy (development only)                                                    |
| `POSTGRES_PASSWORD`           | **Required**  | Password for the main database privileged role                                            |
| `HASURA_GRAPHQL_ADMIN_SECRET` | **Required**  | Hasura admin secret                                                                       |
| `POSTGRES_KC_PASSWORD`        | __Required*__ | Password for Keycloak database privileged role                                            |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | __Required*__ | Keycloak initial admin password                                                           |

(*) Unless `NO_AUTH=true`

[//]: # (TODO: ### Customize the client)

## Detailed Architecture

### Backend

#### PostgreSQL Database (db)

- Main database
- Database name: `geyser`
- Contains two schemas:
    - `public`: Application data
    - `hdb_catalog`: Hasura metadata
- Host port: `5432`
- Persistent volume: `data`
- Access:
    - Role: `postgres`
    - Password: set in `POSTGRES_PASSWORD`

#### Hasura GraphQL Engine (hasura)

- Provides GraphQL API for database access
- API Authentication:
    - Clients: using Keycloak JWTs (disabled if `NO_AUTH=true`)
    - Admin: using Hasura admin secret set in `HASURA_GRAPHQL_ADMIN_SECRET` (localhost only &ndash; external access
      blocked by Nginx)
- Host port: `8080`
- Public endpoint (through Nginx): `/graphql`
- Console (development mode only): run `geyser hasura console` (served at http://localhost:9695 by default)

### Authentication

#### Keycloak Database (kc-db)

- Dedicated database for Keycloak
- Database name: `keycloak`
- Host port: `5433`
- Persistent volume: `kc-data`
- Access:
    - Role: `postgres`
    - Password: set in `POSTGRES_KC_PASSWORD`

#### Keycloak Server (keycloak)

- Identity and access management
- Contains two realms:
    - `master`: for Keycloak administration
    - `geyser`: for application users
        - Contains `hasura` client
        - Issues JWTs used to authenticate requests to Hasura API
- Host ports:
    - `8081` (HTTP)
    - `8443` (HTTPS)
    - `9000` (management interface)
- Public endpoints (through Nginx):
    - `/auth/realms/`: OpenID Connect endpoints
    - `/auth/resources/`: Static assets
- Admin console: http://localhost:8081/admin
    - User: `admin`
    - Password: set in `KC_BOOTSTRAP_ADMIN_PASSWORD`
- Management interface:
    - Metrics: http://localhost:9000/metrics
    - Health: http://localhost:9000/health
- Customizable features (configurable in admin console):
    - Identity providers (SAML, LDAP, Social)
    - Email settings
    - Security policies
    - ...
- Users and groups synchronization with app data: run `geyser sync-keycloak`

**Important note:** On the first start, the realm `geyser` will be imported from `keycloak/templates/geyser-realm.json`.
The root URL of the client `hasura` will be set as:

- `http://${GEYSER_HOSTNAME}` in development mode
- `https://${GEYSER_HOSTNAME}` in production mode

If you later want to change this URL (e.g., when switching from development mode to production mode), you'll need to set
it manually, either from the admin console, or by running the following commands:

```shell
# Login
geyser kcadm --login
# Retrieve hasura client id
client_id="$(geyser -s kcadm get clients -r geyser -q clientId=hasura  | jq -r '.[].id')"
# Update client root URL
geyser -s kcadm update "clients/${client_id}" -r geyser -s rootUrl=<HASURA_CLIENT_ROOT_URL>
```

### Frontend

#### Nginx Reverse Proxy (nginx)

- Single entry point for all client traffic
- Routes:
    - `/auth/realms/`: to Keycloak OpenID Connect endpoints
    - `/auth/resources/`: to Keycloak assets
    - `/graphql`: to Hasura API (with WebSocket support)
    - `/`: to Geyser web client (SPA)
- Host configuration:
    - Configured via `GEYSER_HOSTNAME` environment variable
    - Used for both hostname resolution and certificate directory
    - Examples:
        - Development: `localhost`
        - Production: `geyser.example.com`
- Production mode:
    - SSL/TLS encryption with certificates in `nginx/certs/${GEYSER_HOSTNAME}/`:
        ```
        nginx/certs/
        └── geyser.example.com/
            ├── fullchain.cer   # Certificate chain
            └── private.key     # Private key
        ```
    - Admin secret header stripped from GraphQL requests
    - HTTP → HTTPS redirect (port 80 → 443)

### Network Layout

The application is divided into four isolated networks:

- `app-db`: Database access
    - PostgreSQL database
    - Hasura GraphQL Engine

- `auth-db`: Authentication storage
    - Keycloak database
    - Keycloak server

- `auth-api`: Internal authentication
    - Keycloak server
    - Hasura GraphQL Engine (for JWT authentication)

- `public`: External access
    - Nginx reverse proxy
    - Keycloak server (for authentication endpoints)
    - Hasura GraphQL Engine (for API access)

## Administration

### Administration Script

The `geyser` script provides a comprehensive set of commands to manage your installation:

#### Core Commands

- `init`: Initialize a fresh Geyser installation
- `start`: Start Geyser services
- `stop`: Stop Geyser services
- `update`: Update Geyser services
- `reset`: Reset Geyser to a fresh installation

#### Data Management

- `backup`: Create a backup of Geyser main database
- `restore`: Restore Geyser main database from a backup
- `export-realms`: Export Keycloak realms and users
- `import-realms`: Import Keycloak realms and users
- `sync-keycloak`: Synchronize Keycloak users and groups with app data

#### Development Tools

- `compose`: Docker Compose wrapper
- `hasura`: Hasura CLI wrapper
- `kc`: Keycloak CLI access
- `kcadm`: Keycloak Admin CLI access
- `rsync`: Configured rsync wrapper

#### Options

- `-h, --help`: Show help message
- `-v, --version`: Show version information
- `-s, --silent`: Disable log messages

Run `geyser COMMAND --help` for more information on a command.

### Shell Completion

For Oh My Zsh users, shell completion can be installed with:

```shell
geyser install-completion
```

### Automatic Backups

The script `scripts/backup-webdav` is provided to automatically create a backup of Geyser and upload it to a WebDAV
server (like Nextcloud). It can be scheduled via crontab for regular backups.

Configuration:

- Required environment variables:
    - `WEBDAV_URL`: Base URL of the WebDAV server
    - `WEBDAV_USER`: WebDAV username
    - `WEBDAV_PASS`: WebDAV password
- Can be set in `.env`, `.env.local`, or environment

Example crontab entries:

```
# Hourly backups in June and July
0 * * 6,7 * /path/to/scripts/backup-webdav

# Daily at 3:00 AM other months
0 3 * 1-5,8-12 * /path/to/scripts/backup-webdav
```

## Contributing

Bug reports, feature requests, and pull requests are welcome on GitHub.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
