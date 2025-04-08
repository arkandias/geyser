FROM nginx:1.26-alpine

ARG CLIENT_VERSION=1.0.0
ENV GEYSER_HOSTNAME=localhost

RUN curl -L https://github.com/arkandias/geyser-client/releases/download/${CLIENT_VERSION}/dist.tar.gz | tar xz --strip-components=1 -C /usr/share/nginx/html
