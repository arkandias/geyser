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

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start:prod"]

LABEL \
    org.opencontainers.image.base.name="node:22-slim" \
    org.opencontainers.image.base.digest=""

FROM nginx:1.27 AS frontend
COPY --from=build /prod/client /usr/share/nginx/html

COPY ./nginx/templates/prod.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx/includes/ /etc/nginx/includes/

LABEL \
    org.opencontainers.image.base.name="nginx:1.27" \
    org.opencontainers.image.base.digest=""
