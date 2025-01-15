# SSL certificates

In order to deploy Geyser in a production environment, the following files must be placed in a subdirectory with the
name of the frontend host (defined by the environment variable `SERVER_HOST`):

- `fullchain.cer` containing the SSL certificate(s)
- `private.key` containing the private key
