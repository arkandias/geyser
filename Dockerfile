FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build
COPY . /app
WORKDIR /app

ARG GEYSER_URL
RUN if [ -z "${GEYSER_URL}" ]; then \
      echo "ERROR: GEYSER_URL build argument is required but was not provided."; \
      exit 1; \
    fi

ARG VITE_API_URL="${GEYSER_URL}/api"
ARG VITE_GRAPHQL_URL="${GEYSER_URL}/graphql"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@geyser/api --prod /prod/api
RUN mkdir -p /prod/client && cp -r client/dist/* /prod/client/

FROM base AS api
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

FROM nginx:latest AS client
COPY --from=build /prod/client /usr/share/nginx/html

ARG GEYSER_URL
ENV SCHEME="${GEYSER_URL%%://*}"
ENV GEYSER_HOSTNAME="${GEYSER_URL##*://}"
ENV GEYSER_URL_BUILD="${GEYSER_URL}"

COPY ./nginx/templates/${SCHEME}.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx/includes/ /etc/nginx/includes/

RUN if [ "${SCHEME}" = "https" ]; then \
        mkdir -p "/etc/nginx/certs/default" && \
        mkdir -p "/etc/nginx/certs/${GEYSER_HOSTNAME}" && \
        cp ./nginx/certs/default/* /etc/nginx/certs/default/ && \
        cp "./nginx/certs/${GEYSER_HOSTNAME}/*" "/etc/nginx/certs/${GEYSER_HOSTNAME}/"; \
    fi

COPY --chmod=755 nginx/url-check.sh /docker-entrypoint.d/00-url-check.sh
