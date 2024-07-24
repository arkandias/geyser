# Realm templates

This directory contains realm templates for Keycloak.

## Caution

***Be very careful if you intend to use a realm template in a production environment!***

Templates may contain sensitive data like realm keys and client secrets. Given their public transparency, this presents
a potential security risk, susceptible to unauthorized exploitation.

Though we strive to redact confidential data from the templates in this directory, always practice caution when
importing a realm from public or untrusted sources. Particularly, ensure to always regenerate realm keys and client
secrets.