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

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER  # Log out and back in after this
```

#### Install Hasura CLI

```bash
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```

#### Optional: Install additional tools

```bash
# jq (needed for Keycloak sync)
sudo apt install jq

# Oh My Zsh (needed for completion - for zsh users only)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install Geyser

#### Download and Install

```shell
# Using curl
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | sh

# Or specify a version
curl -fsSL https://github.com/arkandias/geyser-backend/raw/master/scripts/install.sh | env GEYSER_VERSION=2.0 sh
```

#### Initial Setup

```bash
cd ~/.geyser/master     # Or cd ~/.geyser/${GEYSER_VERSION}
cp .env.example .env    # Base development configuration
./scripts/geyser init   # Initialize Geyser
```

### Start Geyser

#### Start services

```bash
./scripts/geyser start
```

#### Access services

- Web Client: http://localhost
- Keycloak Admin: http://localhost:8081
- Hasura Console: `./scripts/geyser hasura console`

## Configuration

### Deployment Modes

Geyser supports two deployment modes controlled by the `MODE` environment variable:

#### Development Mode

The default mode, optimized for local development with additional debugging features:

- Hot reloading enabled
- Development-specific containers (e.g., Keycloak in development mode)
- Access to admin interfaces (Hasura Console, Keycloak Admin)
- Optional components through feature flags:

    - `NO_AUTH=true`: Disables Keycloak authentication, useful for rapid UI development
    - `NO_WEB=true`: Disables Nginx reverse proxy, allowing direct service access

#### Production Mode

Activated by setting `MODE=production`, applies production-grade configurations:

- SSL/TLS encryption required
    - Certificates must be placed in `nginx/certs/` directory
    - See [here](nginx/certs/README.md) for details
- Optimized container settings
- Restricted admin interface access
- All components required (feature flags disabled)
- Enhanced security measures:

    - Keycloak in production mode
    - Hasura Console disabled
    - Strict CORS policies

### Environment Variables

#### Configuration Files

Geyser uses two environment files:

- `.env`: Base configuration file
- `.env.local`: Contains sensitive information (passwords, secrets, etc.)

Variables in `.env.local` take precedence over those in `.env`.

#### Available Variables

| Environment variable          | Default value | Explanation                                                                               |
|-------------------------------|---------------|-------------------------------------------------------------------------------------------|
| `GEYSER_HOSTNAME`             | `localhost`   | Hostname (and optionally port number) where Geyser is served (e.g., `geyser.example.com`) |
| `MODE`                        | `development` | Deployment mode (`development`/`production`)                                              |
| `NO_AUTH`                     | `false`       | Disable authentication (development only)                                                 |
| `NO_WEB`                      | `false`       | Disable Nginx proxy (development only)                                                    |
| `LOG_LEVEL`                   | `INFO`        | Logging threshold (`DEBUG`/`INFO`/`WARN`/`ERROR`)                                         |
| `POSTGRES_PASSWORD`           | **Required**  | Main database superuser password                                                          |
| `POSTGRES_KC_PASSWORD`        | Required*     | Keycloak database superuser password                                                      |
| `HASURA_GRAPHQL_ADMIN_SECRET` | **Required**  | Hasura admin secret                                                                       |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | Required*     | Keycloak admin password                                                                   |

(*) Unless `NO_AUTH=true`

### Customize the client image

[...]

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

#### Frontend Network (frontend)

- Nginx
- Public service endpoints

#### Auth Internal Network (auth-internal)

- Keycloak
- Hasura (for JWT verification)

#### Data Storage Networks (data-storage, auth-storage)

- Main database network
- Keycloak database network

## Administration

### Shell completion

[//]: # (TODO)

```shell
./scripts/geyser completion
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

## Contact

For any questions, comments, suggestions for improvements, or to report any errors or possible bugs, please contact
Julien Hauseux <[julien.hauseux@univ-lille.fr](mailto:julien.hauseux@univ-lille.fr)>.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
