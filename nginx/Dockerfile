FROM nginx:1.26-alpine

ARG CLIENT_VERSION=0.0.2
ARG SERVER_HOST

RUN curl -L https://github.com/arkandias/geyser-client/releases/download/${CLIENT_VERSION}/dist.tar.gz | tar xz -C /usr/share/nginx/html

COPY legal-notice.html /usr/share/nginx/html/public/
