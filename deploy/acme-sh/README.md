# acme.sh Configuration

This guide shows how to obtain and install SSL certificates for Geyser using acme.sh.
The process differs depending on whether you're running in single-tenant or multi-tenant mode.

## Setup

```shell
curl https://get.acme.sh | sh -s email="<email>"
```

Set the following environment variables and create the certificates directory:

```shell
export GEYSER_DOMAIN=<server-hostname>
export GEYSER_HOME=<install-dir>
mkdir -p "${GEYSER_HOME}/certs/${GEYSER_DOMAIN}"
```

## Issue certificate

### Single-tenant Mode (HTTP validation)

For single-tenant mode (`GEYSER_TENANCY=single`), you only need a standard SSL certificate for your domain.
This method uses HTTP validation and doesn't require DNS API access:

```shell
acme.sh --issue -d "${GEYSER_DOMAIN}" --standalone --server letsencrypt --keylength 4096
```

**Note:** Make sure port 80 is accessible from the internet for validation.
The `--standalone` option will temporarily bind to port 80 during validation.

### Multi-tenant Mode (DNS validation required)

For multi-tenant mode, you need a certificate that covers both the root domain and wildcard subdomains.
This method requires DNS validation because wildcard certificates cannot be validated via HTTP methods.

The following example uses OVH DNS but can be adapted for any DNS provider supported by acme.sh.
For other providers, see acme.sh [DNS API documentation][acme-sh-dnsapi].

First, create a token [here][ovh-token-url] with unlimited validity and restricted to the server's IPs.
Then set the environment variables and issue the certificate:

```shell
export OVH_END_POINT=ovh-eu
export OVH_AK="<application-key>"
export OVH_AS="<application-secret>"
export OVH_CK="<consumer-key>"
acme.sh --issue -d "${GEYSER_DOMAIN}" -d "*.${GEYSER_DOMAIN}" --dns dns_ovh --server letsencrypt --keylength 4096
```

## Install certificate

```shell
acme.sh --install-cert -d "${GEYSER_DOMAIN}" \
--fullchain-file "${GEYSER_HOME}/certs/${GEYSER_DOMAIN}/fullchain.crt" \
--key-file "${GEYSER_HOME}/certs/${GEYSER_DOMAIN}/private.key" \
--reloadcmd "${GEYSER_HOME}/cli/geyser compose exec frontend nginx -s reload"
```

## Certificate Renewal

Renewal is automatic every 60 days for both certificate types. To force renewal:

```shell
acme.sh --renew -d "${GEYSER_DOMAIN}" --force
```

[ovh-token-url]: https://api.ovh.com/createToken/?GET=/domain/zone/${GEYSER_DOMAIN}&GET=/domain/zone/${GEYSER_DOMAIN}/*&POST=/domain/zone/${GEYSER_DOMAIN}/*&PUT=/domain/zone/${GEYSER_DOMAIN}/*&DELETE=/domain/zone/${GEYSER_DOMAIN}/record/*
[acme-sh-dnsapi]: https://github.com/acmesh-official/acme.sh/wiki/dnsapi
