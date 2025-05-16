# acme.sh Configuration

## Installation

```shell
curl https://get.acme.sh | sh -s email=julien.hauseux@gmail.com
```

## Issue certificates

Create a token [here][token-url] with unlimited validity and restricted to the server's IPs.

```shell
export OVH_END_POINT=ovh-eu
export OVH_AK="<application key>"
export OVH_AS="<application secret>"
export OVH_CK="<consumer key>"
acme.sh --issue -d geyserflow.org -d "*.geyserflow.org" --dns dns_ovh --server letsencrypt --keylength 4096
```

## Install certificates

```shell
acme.sh --install-cert -d geyserflow.org \
--fullchain-file /home/arkandias/geyser-monorepo/nginx/certs/geyserflow.org/fullchain.crt \
--key-file /home/arkandias/geyser-monorepo/nginx/certs/geyserflow.org/private.key \
--reloadcmd "/home/arkandias/geyser-monorepo/scripts/geyser compose exec nginx nginx -s reload"
```

## Renew certificates

Renewal is automatic every 60 days. To force renewal:

```shell
acme.sh --renew -d geyserflow.org --force
```

[token-url]: https://api.ovh.com/createToken/?GET=/domain/zone/geyserflow.org&GET=/domain/zone/geyserflow.org/*&POST=/domain/zone/geyserflow.org/*&PUT=/domain/zone/geyserflow.org/*&DELETE=/domain/zone/geyserflow.org/record/*
