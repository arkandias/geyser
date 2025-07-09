FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build
COPY . /app
WORKDIR /app

ARG VITE_BUILD_VERSION
ARG VITE_API_URL
ARG VITE_GRAPHQL_URL
ARG VITE_ORGANIZATION_KEY

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@geyser/server --prod /prod/server
RUN mkdir -p /prod/client && cp -r client/dist/* /prod/client/

FROM base AS backend
COPY --from=build /prod/server /app
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
COPY --from=build /prod/client /usr/share/nginx/html

COPY nginx/templates/single-tenant.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx/includes/ /etc/nginx/includes/
