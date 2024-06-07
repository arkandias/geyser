# Importing and exporting realms

Keycloak must not be started to import/export realms (although exporting seems to work to some extent when the server is
started).
We list some useful commands here.

### Exporting realms

```shell
scripts/kc export --dir /opt/keycloak/data/import/
```

#### Only Geyser

```shell
scripts/kc export --dir /opt/keycloak/data/import/ --realm geyser
```

#### Without users

```shell
scripts/kc export --dir /opt/keycloak/data/import/ --users skip
```

### Importing realms

Keycloak must be down before running the following command.

```shell
scripts/kc_run import --dir /opt/keycloak/data/import/
```

#### From a file

```shell
scripts/kc_run import --file /opt/keycloak/data/import/my-file.json
```
