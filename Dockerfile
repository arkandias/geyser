FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build-shared
COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=shared run build

FROM build-shared AS build-backend

RUN pnpm --filter=server run build
RUN pnpm --filter=server deploy --prod /prod/server

FROM build-shared AS build-frontend

ARG BUILD_VERSION
ARG API_URL
ARG GRAPHQL_URL
ARG TENANCY_MODE
ARG ORGANIZATION_KEY

RUN test -n "${API_URL}" || (echo "ERROR: API_URL build argument is required" && exit 1) 
RUN test -n "${GRAPHQL_URL}" || (echo "ERROR: GRAPHQL_URL build argument is required" && exit 1)
RUN test -n "${TENANCY_MODE}" || (echo "ERROR: TENANCY_MODE build argument is required" && exit 1)
RUN bash -c '[[ "${TENANCY_MODE}" =~ ^(multi|single)$ ]] || (echo "ERROR: TENANCY_MODE must be \"multi\" or \"single\", got: \"${TENANCY_MODE}\"" && exit 1)'

RUN VITE_BUILD_VERSION="${BUILD_VERSION}" \
    VITE_API_URL="${API_URL}" \
    VITE_GRAPHQL_URL="${GRAPHQL_URL}" \
    VITE_MULTI_TENANT=$([ "${TENANCY_MODE}" = "multi" ] && echo "true" || echo "false") \
    VITE_ORGANIZATION_KEY="${ORGANIZATION_KEY}" \
    pnpm --filter=client run build

FROM base AS backend
COPY --from=build-backend /prod/server /app
WORKDIR /app

# Add curl for health check
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV API_NODE_ENV=production
ENV API_PORT=3000
EXPOSE 3000
CMD ["pnpm", "start:prod"]

FROM nginx:1.27 AS frontend
COPY --from=build-frontend /app/client/dist /usr/share/nginx/html

ARG TENANCY_MODE
RUN test -n "${TENANCY_MODE}" || (echo "ERROR: TENANCY_MODE build argument is required" && exit 1)
RUN bash -c '[[ "${TENANCY_MODE}" =~ ^(multi|single)$ ]] || (echo "ERROR: TENANCY_MODE must be \"multi\" or \"single\", got: \"${TENANCY_MODE}\"" && exit 1)'

COPY nginx/templates/${TENANCY_MODE}-tenant.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx/includes/ /etc/nginx/includes/
