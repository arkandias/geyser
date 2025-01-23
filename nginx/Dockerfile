FROM node:20 AS builder

WORKDIR /app

ARG CLIENT_VERSION=v0.1
ARG SERVER_HOST

ENV VITE_BUILD_VERSION=${CLIENT_VERSION}
ENV VITE_GRAPHQL_URL=${SERVER_HOST}/graphql
ENV VITE_KEYCLOAK_URL=${SERVER_HOST}/auth

RUN git clone --depth 1 --branch ${CLIENT_VERSION} https://github.com/arkandias/geyser-client.git .

# Copy legal notice if provided
RUN test -f ./legal-notice.html && cp ./legal-notice.html /app/src/content/legal-notice.html

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
