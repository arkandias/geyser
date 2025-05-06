FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ./prod/ /prod
WORKDIR /prod
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
