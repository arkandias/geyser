FROM node:20 as builder

WORKDIR /app

ARG CLIENT_VERSION
ARG SERVER_HOST
ARG LEGAL_NOTICE

# Copy legal notice if provided
RUN cp ${LEGAL_NOTICE} /app/src/content/legal-notice.html 2>/dev/null || true

ENV VITE_BUILD_VERSION=${CLIENT_VERSION}
ENV VITE_GRAPHQL_URL=${SERVER_HOST}/graphql
ENV VITE_KEYCLOAK_URL=${SERVER_HOST}/auth

RUN git clone --depth 1 --branch ${CLIENT_VERSION} https://github.com/arkandias/geyser-client.git .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
