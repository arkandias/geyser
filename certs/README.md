# SSL Certificates

## Production Deployment

For production deployment, you MUST place your verified SSL certificates in a subdirectory named after your frontend
hostname (as defined by the `GEYSER_HOSTNAME` environment variable):

- `fullchain.crt`: The complete certificate chain (server certificate + intermediates)
- `private.key`: The private key (keep this secure!)

Example path: `/etc/nginx/certs/geyser.example.com/`

### ⚠️ SECURITY WARNING ⚠️

The certificates in the `default` subdirectory are **NOT SECURE** for production use!
These are publicly available self-signed certificates used only for rejecting unknown connections to port 443. Using
these for your actual hostname would create a severe security vulnerability.

Never use the default certificates for your actual application traffic. They provide no security and will trigger
browser warnings.