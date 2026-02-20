# build stage for the React/Vite frontend
FROM node:22-alpine AS build
WORKDIR /app

# copy package metadata and install deps first to leverage caching
COPY package.json package-lock.json* ./
RUN npm ci

# copy the rest of the source
COPY . .

# build the static assets
RUN npm run build

# production stage using Caddy as a pure static file server
FROM caddy:2-alpine

# copy build output from previous stage
COPY --from=build /app/dist /usr/share/caddy

# copy our Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
