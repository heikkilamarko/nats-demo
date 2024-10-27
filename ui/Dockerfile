FROM node:lts-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM caddy:2-alpine
COPY ./Caddyfile /etc/caddy/
COPY --from=build /app/build /usr/share/ui
