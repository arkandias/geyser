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

### Installation Steps

#### Install Docker

```shell
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER  # Log out and back in after this
```

#### Install Hasura CLI

```shell
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```

#### Optional: Install additional tools

```shell
# jq (needed for Keycloak sync)
sudo apt install jq

# Oh My Zsh (needed for completion - for zsh users only)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install Geyser

#### Download and Install

- For the latest version (Geyser will be installed in `~/.geyser/master`):

```shell
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh
```

- For a specific version (Geyser will be installed in `~/.geyser/${GEYSER_VERSION}`):

```shell
export GEYSER_VERSION="1.2.3"
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh
```

#### Post-installation

If you get a "command not found" error when running `geyser` after installation, add `~/.local/bin` to your
PATH by running the following command (for permanent configuration, add this command to your shell configuration file,
e.g., `~/.bashrc` or `~/.zshrc`):

```shell
export PATH="$HOME/.local/bin:$PATH"
```

Alternatively, you can use `~/.geyser/master/scripts/geyser` (or `~/.geyser/${GEYSER_VERSION}/scripts/geyser`) instead
of `geyser` in all the instructions below.

#### Initialization

```shell
geyser init
```

### Start Geyser

#### Start services

```shell
geyser start
```

#### Access services

- Web Client: http://localhost
- Keycloak Admin: http://localhost:8081
- Hasura Console: `geyser hasura console`

## Configuration

### Architecture Overview

Geyser consists of the following main components:

- Frontend:
    - Single Page Application (SPA)
    - Nginx routing all external access
- Backend:
    - PostgreSQL database for application data
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
    - Keycloak in production mode
    - Feature flags disabled
- Restricted access:
    - CORS policy enabled for Hasura
    - Hasura Console disabled
    - Keycloak Hostname debug interface disabled
    - Admin interfaces protected

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
| `POSTGRES_PASSWORD`           | **Required**  | Main database superuser password                                                          |
| `HASURA_GRAPHQL_ADMIN_SECRET` | **Required**  | Hasura admin secret                                                                       |
| `POSTGRES_KC_PASSWORD`        | __Required*__ | Keycloak database superuser password                                                      |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | __Required*__ | Keycloak admin password                                                                   |

(*) Unless `NO_AUTH=true`

[//]: # (TODO: ### Customize the client)

## Detailed Architecture

### Backend

#### PostgreSQL Database (db)

- Geyser core database
- Database name: `geyser`
- Contains two schemas:
    - `public`: Application data
    - `hdb_catalog`: Hasura metadata
- Host port: `5432`
- Persistent volume: `data`

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

- Dedicated database for Keycloak data
- Database name: `keycloak`
- Host port: `5433`
- Persistent volume: `kc-data`

#### Keycloak Server

- Identity and access management
- Contains two realms:
    - `master`: for Keycloak administration
    - `geyser`: for application users
        - Contains `hasura` client
        - Issues JWTs used to authenticate requests to Hasura's API
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
- User synchronization with application data: run `geyser sync-keycloak`

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

#### Nginx Reverse Proxy

- Single entry point for all client traffic
- Routes:
    - `/auth/*` → Keycloak
    - `/graphql` → Hasura API (with WebSocket support)
    - `/` → SPA static files
- Production mode:
    - SSL/TLS termination
    - Certificate path: `nginx/certs/${GEYSER_HOSTNAME}/`
    - HTTP → HTTPS redirection
- Host ports:
    - Development: `80`
    - Production: `80` (redirect), `443` (SSL)

## Architecture

Geyser is built on a modern containerized stack with the following components:

### Core Services

#### PostgreSQL (db)

- Primary data store for application data
- Version: 16
- Database name: `geyser`
    - `public` schema: Application data
    - `hdb_catalog` schema: Hasura metadata
- Host port: `5432`
- Persistent volume: `data`

#### Hasura GraphQL Engine (hasura)

- GraphQL API layer
- JWT authentication via Keycloak integration
- Database schema and metadata management

### Authentication Layer

#### Keycloak Database (kc-db)

- Dedicated PostgreSQL instance (version 16)
- Database name: `keycloak`
- Host port: `5433`
- Persistent volume: `kc-data`

#### Keycloak Server (keycloak)

- Identity and access management
- JWT token provider for Hasura
- Admin interface for user management

#### Realms

- **Master realm**: Administrative realm for Keycloak itself
- **Geyser realm**: Application-specific realm containing:
    - Hasura client configuration
    - User management
    - Role definitions

#### Configuration

- Initialization:
    - Realms imported on startup
    - `HASURA_CLIENT_ROOT_URL` set during import
    - Must be manually updated in admin console if `GEYSER_HOSTNAME` changes

#### Customizable Features

Available through admin console:

- Password recovery email settings
- Events logging and expiration
- Internationalization (default: French)
- Brute-force protection
- Account lockout policies
- Identity providers:
    - SAML federations (e.g., RENATER for French higher education)
    - Enterprise directory services (LDAP/Active Directory)
    - Social login providers (Google, Facebook, etc.)

### Frontend Proxy

#### Nginx (nginx)

- Production mode features:
    - SSL/TLS termination
    - HTTP → HTTPS redirection
    - Admin secret stripping for Hasura
- Proxying features:
    - WebSocket support for GraphQL subscriptions
    - `X-Forwarded-*` headers for proper client info
    - Path-based prefix handling

#### Endpoints

With `NO_WEB=true`, services are directly accessible:

- Hasura Console: http://localhost:8080
- Keycloak Admin: http://localhost:8081
- SPA: http://localhost

With Nginx reverse proxy (assuming `GEYSER_HOSTNAME=example.com`):

| Service  | Public URL                          | Internal Route           |
|----------|-------------------------------------|--------------------------|
| Keycloak | https://example.com/auth/js/        | keycloak:8443/js/        |
|          | https://example.com/auth/realms/    | keycloak:8443/realms/    |
|          | https://example.com/auth/resources/ | keycloak:8443/resources/ |
| Hasura   | https://example.com/graphql         | hasura:8080/v1/graphql   |
| SPA      | https://example.com/                | /usr/share/nginx/html    |

### Network Layout

#### Frontend Network (public)

- Nginx
- Public service endpoints

#### Auth Internal Network (auth-api)

- Keycloak
- Hasura (for JWT verification)

#### Data Storage Networks (app-db, auth-db)

- Main database network
- Keycloak database network

## Administration

### Shell completion

[//]: # (TODO)

```shell
geyser completion
```

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
#   # Hourly backups in June and July
#   0 * * 6,7 * /path/to/scripts/backup-webdav
#
#   # Daily at 3:00 AM every month except June and July
#   0 3 * 1-5,8-12 * /path/to/scripts/backup-webdav
```

## Contributing

Bug reports, feature requests, and pull requests are welcome on GitHub.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
