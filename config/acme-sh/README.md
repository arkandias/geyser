# acme.sh Configuration

## Installation

```shell
curl https://get.acme.sh | sh -s email="<email>"
```

Set the following environment variables:

```shell
export GEYSER_DOMAIN=<server-hostname>
export GEYSER_HOME=<install-dir>
```

## Issue certificates (with OVH DNS)

Create a token [here][token-url] with unlimited validity and restricted to the server's IPs.

```shell
export OVH_END_POINT=ovh-eu
export OVH_AK="<application-key>"
export OVH_AS="<application-secret>"
export OVH_CK="<consumer-key>"
acme.sh --issue -d "${GEYSER_DOMAIN}" -d "*.${GEYSER_DOMAIN}" --dns dns_ovh --server letsencrypt --keylength 4096
```

## Install certificates

```shell
acme.sh --install-cert -d "${GEYSER_DOMAIN}" \
--fullchain-file "${GEYSER_HOME}/certs/${GEYSER_DOMAIN}/fullchain.crt" \
--key-file "${GEYSER_HOME}/certs/${GEYSER_DOMAIN}/private.key" \
--reloadcmd "${GEYSER_HOME}/scripts/geyser compose exec frontend nginx -s reload"
```

## Renew certificates

Renewal is automatic every 60 days. To force renewal:

```shell
acme.sh --renew -d "${GEYSER_DOMAIN}" --force
```

[token-url]: https://api.ovh.com/createToken/?GET=/domain/zone/${GEYSER_DOMAIN}&GET=/domain/zone/${GEYSER_DOMAIN}/*&POST=/domain/zone/${GEYSER_DOMAIN}/*&PUT=/domain/zone/${GEYSER_DOMAIN}/*&DELETE=/domain/zone/${GEYSER_DOMAIN}/record/*
