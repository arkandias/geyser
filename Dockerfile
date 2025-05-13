FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@geyser/api --prod /prod/api
RUN mkdir -p /prod/client && cp -r client/dist/* /prod/client/

FROM base AS api
COPY --from=build /prod/api /app
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start:prod"]

FROM nginx:latest AS client
ARG MODE=production
COPY --from=build /prod/client /usr/share/nginx/html
COPY ./nginx/includes/ /etc/nginx/includes/
COPY ./nginx/templates/${MODE}.conf.template /etc/nginx/templates/default.conf.template
