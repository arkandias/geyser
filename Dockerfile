FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build
COPY . /app
WORKDIR /app

ARG GEYSER_URL
ARG VERSION

ARG VITE_BUILD_VERSION="${VERSION}"
ARG VITE_API_URL="${GEYSER_URL}/api"
ARG VITE_GRAPHQL_URL="${GEYSER_URL}/graphql"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@geyser/api --prod /prod/api
RUN mkdir -p /prod/client && cp -r client/dist/* /prod/client/

FROM base AS backend
COPY --from=build /prod/api /app
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

FROM nginx:latest AS frontend
COPY --from=build /prod/client /usr/share/nginx/html

ARG GEYSER_URL
ENV GEYSER_HOSTNAME="${GEYSER_URL#https://}"

COPY ./nginx/templates/prod.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx/includes/ /etc/nginx/includes/

# Add a script that validates at runtime that the GEYSER_URL environment variable 
# matches the URL used during build time. This prevents deployment misconfigurations
# where the container built for one URL is accidentally used with a different URL.
ENV GEYSER_URL_BUILD_ARG="${GEYSER_URL}"
COPY --chmod=755 nginx/url-check.sh /docker-entrypoint.d/00-url-check.sh
