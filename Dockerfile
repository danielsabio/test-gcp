FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm i

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 8081
USER node
CMD [ "pnpm", "start" ]

# FROM node:latest AS base
# COPY . /app
# WORKDIR /app

# RUN npm i
# RUN npm run build

# EXPOSE 8080
# CMD ["npm", "start"]