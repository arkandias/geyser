FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

# Deploy only the server, not the client
RUN pnpm deploy --filter=@geyser/api --prod /prod/api

# Build artifacts:
# - /usr/src/app/client/dist (client static files - all you need)
# - /prod/api (deployable server package with dependencies)
