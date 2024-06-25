# Geyser

*Gestion des services prévisionnels*

- [Geyser](#geyser)
    - [Getting Started](#getting-started)
        - [Installation](#installation)
        - [Configuration](#configuration)
            - [Environment Variables](#environment-variables)
            - [SSL Certificates](#ssl-certificates)
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

### Installation

Start by cloning the project's repository (you need Git for this):

```shell
git clone https://gitlab.univ-lille.fr/julien.hauseux/geyser-backend.git
```

This will create a directory `geyser-backend` in your working directory. Switch to this directory:

```shell
cd geyser-backend
```

The essential tools that need to be installed on your machine include:

- Docker Compose
- Hasura CLI

Although not necessary, the following tools are needed to use some of the convenient scripts provided with this project:

- PostgreSQL
- jq

On Ubuntu, these tools can be installed all at once:

```shell
./scripts/install_tools
```

If you're using Bash or Zsh, you can add the environment variables `GEYSER_DIR` and `GEYSER_MODE` to your profile, as
well as some convenient aliases:

```shell
source ./scripts/add_configuration
``` 

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

### Running Geyser

The script `scripts/geyser` provides the following commands:

- `start` to start Geyser
- `stop` to stop Geyser
- `reset` to make a copy of the database and starts a fresh configuration

Use these command with one of the following options:

- `--dev` in a development environment
- `--prod` in a production/staging environment

Equivalently, you can set the environment variable `GEYSER_MODE` to `development` or `production`.

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
