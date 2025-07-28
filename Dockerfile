FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build-shared

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
COPY ./shared/package.json ./shared/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./tsconfig.base.json ./
COPY ./client/ ./client/
COPY ./server/ ./server/
COPY ./shared/ ./shared/

RUN pnpm --filter=shared run build

FROM build-shared AS build-backend

RUN pnpm --filter=server run build
RUN pnpm --filter=server deploy --prod /prod/server

FROM build-shared AS build-frontend

ARG VITE_BUILD_VERSION
ARG VITE_API_URL
ARG VITE_GRAPHQL_URL
ARG VITE_TENANCY_MODE
ARG VITE_ORGANIZATION_KEY

RUN VITE_BUILD_VERSION="${VITE_BUILD_VERSION}" \
    VITE_API_URL="${VITE_API_URL}" \
    VITE_GRAPHQL_URL="${VITE_GRAPHQL_URL}" \
    VITE_TENANCY_MODE="${VITE_TENANCY_MODE}" \
    VITE_ORGANIZATION_KEY="${VITE_ORGANIZATION_KEY}" \
    pnpm --filter=client run build

FROM base AS backend

WORKDIR /app

COPY --from=build-backend /prod/server ./

# Add curl for health check
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV API_NODE_ENV=production
ENV API_PORT=3000

EXPOSE 3000

CMD ["pnpm", "start:prod"]

FROM nginx:1.29 AS frontend

COPY --from=build-frontend /app/client/dist /usr/share/nginx/html
COPY --chmod=755 ./nginx/docker-entrypoint.d/ /docker-entrypoint.d/
COPY ./nginx/templates/ /etc/nginx/templates/
COPY ./nginx/includes/ /etc/nginx/includes/

EXPOSE 80
EXPOSE 443
