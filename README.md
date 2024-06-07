# Geyser

*Gestion des services prévisionnels*

- [Geyser](#geyser)
    - [Getting Started](#getting-started)
        - [Prerequisites](#prerequisites)
        - [Configuration](#configuration)
            - [Environment Variables](#environment-variables)
            - [Running Geyser](#running-geyser)
    - [Components](#components)
        - [Postgres](#postgres)
        - [Hasura](#hasura)
        - [Keycloak](#keycloak)
    - [Contact](#contact)
    - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

The essential tools that need to be installed on your machine include:

- Docker Compose (v2.27)
- Hasura CLI (v2.39)

Although not necessary, the following tools may prove beneficial to some of the convenient scripts provided with this
project:

- PostgreSQL 16
- jq 9 (v1.7)

On Ubuntu, these tools can be installed all at once using the script `install_tools`.

If you're using Bash or Zsh, you can also run the script `add_configuration` to add some convenient aliases to
your shell.

### Configuration

#### Environment variables

Environment variables can be stored in either of the following .env files:

- `.env.local`
- `.env.dev` (for development only)
- `.env.prod` (for production only)

The passwords/secrets that must be set (typically in `.env.local`):

| Environment variable          | Explanation                                                           |
|-------------------------------|-----------------------------------------------------------------------|
| `POSTGRES_PASSWORD`           | Password for the role `postgres` in the database (superuser)          |
| `KC_DB_PASSWORD`              | Password for the role `keycloak` in the database                      |
| `HASURA_DB_PASSWORD`          | Password for the role `hasura` in the database                        |
| `KEYCLOAK_ADMIN_PASSWORD`     | Password for the initial admin user `admin` of the keycloak container |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Admin secret for Hasura GraphQL Engine                                |

The following environment variable must also be set (either in `.env.local` or one of `.env.dev` and `.env.prod`):

| Environment variable | Explanation                                                                                                              |
|----------------------|--------------------------------------------------------------------------------------------------------------------------|
| `FRONTEND_HOST`      | The hostname and, optionally, the port number at which the web app will be served (e.g. `localhost:5173`, `example.com`) |

*N.B. In order to run the application, all three files `.env.dev`, `.env.prod`, and `.env.local` must exist at
the root of the project.*

#### SSL Certificates

The SSL certificates must be placed in `ssl/certs`, see [here](ssl/certs/README.md).

#### Running Geyser

The script `scripts/geyser` provides the following commands:

- `start`: starts Geyser
- `stop`: stops Geyser
- `reset`: makes a copy of the database and starts a fresh configuration

In a development environment, use the option `--dev`. Equivalently, you can set the environment variable `GEYSER_MODE`
to `development`.

## Components

### Postgres

A PostgreSQL database named `geyser` contains the following schemas (among others):

- `ec`: the web app data
- `keycloak`: Keycloak data
- `hdb_catalog`: Hasura metadata

A script `scripts/db` gathers some handy commands to manage the database (dump, clean, restore, etc.).

### Hasura

The GraphQL API is available at:

- http://localhost:8090/v1/graphql in development mode
- https://example.com/graphql in production mode (assuming `FRONTEND_HOST=example.com`)

Hasura permissions are handled by giving users some of the following roles.

In development mode, you can run `scripts/hasura console` to access the console at http://localhost:9695.

| Role           | Explanations                                         |
|----------------|------------------------------------------------------|
| Intervenant    | The base user role with restricted permissions       |
| Commissaire    | Some extra permissions during the "commission" phase |
| Administrateur | The superuser role with all permissions              |

### Keycloak

Keycloak manages the authentication and the roles of the Hasura users using JWT tokens.

#### Endpoints

In development mode, Keycloak can be reached at http://localhost:8080.

In production mode, the following ports are exposed by the reverse proxy (assuming `FRONTEND_HOST=example.com`):

| Path          | Reverse proxy path                  |
|---------------|-------------------------------------|
| `/js/`        | https://example.com/auth/js/        |
| `/realms/`    | https://example.com/auth/realms/    |
| `/resources/` | https://example.com/auth/resources/ |

In particular, the path `/admin/` is not exposed for security reason.
You can access this path using SSH Tunnel: if you connect with `ssh -L  8080:localhost:80` to the production server,
then `/auth/` can be reached at http://localhost:8080/auth/admin.
In particular, the admin console is available at http://localhost:8080/auth/admin.

#### Importing and exporting realms

See [here](./keycloak/data/import/README.md).

#### Installing an extension

See [here](./keycloak/providers/README.md).

## Contact

For any questions, comments, suggestions for improvements, or to report any errors or possible bugs, please contact
Julien Hauseux <[julien.hauseux@univ-lille.fr](mailto:julien.hauseux@univ-lille.fr)>.

## License

This project is licensed under the GNU Affero General Public License v3.0 &ndash; see the [LICENSE](LICENSE) file for
details.
