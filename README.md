# Geyser

<img src="logo.svg" alt="Geyser logo" width="500">

Geyser is a web application that streamlines the course assignment process in educational institutions. It manages the
complete workflow from initial teacher requests through commission decisions to final assignments. Built with
PostgreSQL, Hasura GraphQL, NestJS, and Keycloak authentication, it provides a secure and efficient "Course Assignment Flow".

## Table of contents

## Quick Start

This guide will get you a working instance instance of Geyser in minutes.

### System Requirements and Dependencies

#### Core Requirements

- Linux or macOS
- Docker Engine 25.0 or later (with Docker Compose V2)
- Hasura CLI

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
# Oh My Zsh (required for zsh completion)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Installation

Download and install the latest version (in `~/.geyser/<version>/`):

```shell
curl -fsSL https://github.com/arkandias/geyser-monorepo/raw/HEAD/scripts/install.sh | sh
```

Or for a specific version:

```shell
GEYSER_VERSION="1.2.3"
curl -fsSL "https://github.com/arkandias/geyser-monorepo/raw/${GEYSER_VERSION}/scripts/install.sh" | sh
```

### Initialization

1. Edit the file `~/.geyser/<version>/.env` and replace `geyser.example.com` with your server's hostname.

2. Add the TLS certificates for your server's hostname to the `nginx/certs` directory:
   - `nginx/certs/fullchain.crt` should contain the full certificate chain
   - `nginx/certs/private.key` should contain the private key

3. Initialize Geyser with the following command:

   ```shell
   geyser init
   ```

   N.B. If you get a "command not found" error, add `~/.local/bin` to your PATH:

   ```shell
   export PATH="$HOME/.local/bin:$PATH"
   ```

   Add this line to your shell configuration file (e.g., `~/.bashrc` or `~/.zshrc`) to make it permanent.

   Alternatively, you can use the full path to the script: `~/.geyser/<version>/scripts/geyser`

4. During initialization, you will be prompted for Keycloak temporary admin account username and password (choose a
   strong one!).

5. Once the initialization is finished, the following services are accessible in a web browser:
   - Keycloak: `https://<server-hostname>/auth`
   - Geyser: `https://<server-hostname>`

### Creating a first user in Keycloak

The Keycloak account you created during initialization is a temporary account for the realm `master`. This realm is
intended to administrate the other realms only. Thus, Geyser uses a different realm to authenticate users: the realm
`geyser`. We will now create a first user in this realm, with privileges to administrate the app. In a web browser,
go to: `https://<server-hostname>/auth`

1. Connect to Keycloak admin console using the temporary admin account.

   ![Keycloak master realm login page](docs/images/keycloak/01_login_master.png)

2. Once logged in, click on the "Manage realms" button in the left menu and select "geyser" (click on the name).

   ![Keycloak master realm login page](docs/images/keycloak/02_manage_realms.png)

3. Now, "Geyser" must be displayed next to the "Current realm" badge. Click on the "Users" button in the left
   menu, and then on the "Create new user" button.

   ![Keycloak master realm login page](docs/images/keycloak/03_users.png)

4. Fill in the "Create user" form. You must provide an email and "Email verified" must be "On" (at the top of the form).
   The other fields are optional. Then, click on the "Join Groups" button (at the bottom of the form).

   ![Keycloak master realm login page](docs/images/keycloak/04_create_user.png)

5. In the "Select the groups to join" dialog box, check the box of the "AppAdmin" group and click on the "Join" button.
   This will give the user admin privileges in Geyser.

   ![Keycloak master realm login page](docs/images/keycloak/05_join_groups.png)

6. Now that the user is created, you will be redirected to the user "Details" tab. Click on the "Credentials" tab, and
   then on the "Set password" button.

   ![Keycloak master realm login page](docs/images/keycloak/06_user_credentials.png)

7. Enter you new user's password (twice), set "Temporary" to "Off", and click on the "Save" button.

   ![Keycloak master realm login page](docs/images/keycloak/07_set_password.png)

8. Go to: `https://<server-hostname>` and log into Geyser with your newly created user email and password.

   ![Keycloak master realm login page](docs/images/keycloak/08_login_geyser.png)

9. You can now refer to the [app documentation]() to configure Geyser.

#### Advanced Keycloak configuration

For an advanced configuration of Keycloak, you can refer to [Keycloak documentation](https://www.keycloak.org/documentation).

We simply point some useful login options.

1. If you want to allow users to create an account in Keycloak and to recover their password, you can enable this option
   on the "Login" tab of the "Realm settings" page.

   ![Keycloak master realm login page](docs/images/keycloak/09_login_options.png)

   For these options to work, Keycloak must be configured to send emails. You can do this in the "Email" tab. Note that
   the current admin user must have an email address to configure Keycloak's email. You can add one on the "Users" page.

   ![Keycloak master realm login page](docs/images/keycloak/10_email_a.png)

   ![Keycloak master realm login page](docs/images/keycloak/11_email_b.png)

2. You may use an external identity provider, for example if your institution or your company provides one. This can be
   configured on the "Identity providers" page.

   ![Keycloak master realm login page](docs/images/keycloak/12_identity_providers.png)

**_N.B. Users with a Keycloak account will not automatically have access to Geyser. Keycloak is only used to
authenticate users with their email address. Access is configured from within the app._**

## Architecture Overview

Geyser consists of multiple services, each running in a Docker container organized into three logical tiers:

### Frontend (frontend)

The frontend is an Nginx server that serves as the main entry point and reverse proxy for all external access:

- `https://<server-hostname>` serves the web client application
- `https://<server-hostname>/api` proxies requests to the backend NestJS server
- `https://<server-hostname>/auth` proxies requests to the Keycloak authentication service

The frontend also handles TLS termination and serves static assets for the web application.

### Backend (backend, hasura, db)

The backend tier consists of three interconnected services:

- **NestJS Server (backend)**: The main API server accessible via the frontend proxy at `/api`
- **Hasura GraphQL Engine (hasura)**: Provides GraphQL interface to the database
- **PostgreSQL Database (db)**: Stores all application data

The NestJS server can query the database either directly via SQL or through Hasura's GraphQL API. Both the database and
Hasura are isolated on a private network (`private-db`) and are only accessible by the NestJS server -- they cannot be
reached from outside the Docker environment.

### Authentication (keycloak, kc-db)

User authentication is handled by a dedicated Keycloak instance with its own PostgreSQL database:

- **Keycloak (keycloak)**: OpenID Connect provider for user authentication, accessible via the frontend proxy at `/auth`
- **Keycloak Database (kc-db)**: Dedicated PostgreSQL instance storing user credentials and identity data

The authentication flow works as follows:

1. Users authenticate with Keycloak using their email address
2. The backend validates tokens with Keycloak and fetches additional user information (roles, permissions)
3. The backend issues its own access tokens for API requests
4. Clients include these access tokens in API requests for authorization

### Network Architecture

Services are organized into three Docker networks:

- `public`: Connects frontend, backend, and keycloak for external-facing communication
- `private-db`: Isolates the main database and Hasura from external access
- `private-kc-db`: Isolates the Keycloak database for security

## Configuration

### Environment Variables

#### Configuration Files

Geyser uses two environment files:

- `.env`: Base configuration file with default values
- `.env.local`: Local overrides (not version-controlled)

Variables in `.env.local` take precedence over those in `.env`.

#### Available Variables

| Environment variable          | Default value | Explanation                                                                                                           |
| ----------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `GEYSER_ENV`                  | `production`  | Deployment environment (`development`/`production`), see [here](#deployment-environment)                              |
| `GEYSER_DOMAIN`               | `localhost`   | Hostname (and optionally port number) of the server (e.g., `geyser.example.com`)                                      |
| `GEYSER_TENANCY`              | `single`      | Tenancy mode (`single`/`multi`), see [here](#tenancy-mode)                                                            |
| `GEYSER_LOG_LEVEL`            | `info`        | Logging threshold (`silent`/`debug`/`info`/`warn`/`error`)                                                            |
| `GEYSER_AS_SERVICE`           | `false`       | Indicate if Geyser is running as a systemd service (`true`/`false`), see [here](#running-geyser-as-a-systemd-service) |
| `KC_DB_PASSWORD`              | **Required**  | Password for Keycloak database privileged role                                                                        |
| `DB_PASSWORD`                 | **Required**  | Password for the main database privileged role                                                                        |
| `HASURA_GRAPHQL_ADMIN_SECRET` | **Required**  | Hasura admin secret (bypass token authentication)                                                                     |
| `API_ADMIN_SECRET`            | **Required**  | API admin secret (bypass token authentication)                                                                        |
| `OIDC_CLIENT_SECRET`          | **Required**  | Secret for Keycloak `app` client used by backend to authenticate users                                                |

### Deployment environment

### Tenancy mode

### Running Geyser as a systemd service

## Administration

### Administration Script

The `geyser` script provides a comprehensive set of commands to manage your installation:

#### Core Commands

- `init`: Initialize a fresh Geyser installation
- `start`: Start Geyser services
- `stop`: Stop Geyser services
- `restart`: Restart Geyser services
- `show`: Show Geyser services
- `update`: Update Geyser services
- `cleanup`: Cleanup Geyser services
- `purge`: Completely remove Geyser installation and all data

#### Data Management

- `data-backup`: Backup Geyser main database
- `data-restore`: Restore Geyser main database
- `keycloak-export`: Export Keycloak realms and users
- `keycloak-import`: Import Keycloak realms and users
- `webdav-upload`: Upload a file or directory to a WebDAV server

#### Development Tools

- `compose`: Docker Compose wrapper
- `hasura`: Hasura CLI wrapper
- `kc`: Keycloak CLI access
- `kcadm`: Keycloak Admin CLI access
- `webhook`: Webhook wrapper
- `webhook-start`: Start a webhook on port 9000
- `webhook-stop`: Terminate any process listening on port 9000
- `deploy`: Deploy Geyser from remote repository

#### Setup

- `install-completion`: Install zsh completion (using oh-my-zsh)

#### Options

- `-h, --help`: Show help message
- `-v, --version`: Show version information
- `--log-level LEVEL`: Set log level [silent|debug|info|warn|error]
- `--silent`: Set log level to silent
- `--debug`: Set log level to debug
- `--env ENV`: Set deployment environment [development|production]
- `--dev`: Set environment to development
- `--prod`: Set environment to production
- `--domain DOMAIN`: Set domain name for deployment (e.g., geyser.example.com)
- `--as-service`: Run as a systemd service (affects logging)

Run `geyser COMMAND --help` for more information on a command.

### Shell Completion

For zsh users, shell completion can be installed with:

```shell
geyser install-completion
```

### Automatic Backups

The script `scripts/backup.sh` is provided to automatically create a backup of Geyser and upload it to a WebDAV server
(e.g., Nextcloud). It can be scheduled via crontab for regular backups.

Configuration:

- Required environment variables:
  - `WEBDAV_URL`: Base URL of the WebDAV server
  - `WEBDAV_USER`: WebDAV username
  - `WEBDAV_PASS`: WebDAV password
  - `WEBDAV_DIR`: Directory for uploads on the WebDAV server
- Can be set in `.env`, `.env.local`, or environment

Example crontab entries:

```
# Hourly backups in June and July
0 * * 6,7 * /path/to/scripts/backup.sh

# Daily at 3:00 AM other months
0 3 * 1-5,8-12 * /path/to/scripts/backup.sh
```

### CI/CD

## Contributing

Bug reports, feature requests, and pull requests are welcome on GitHub.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
