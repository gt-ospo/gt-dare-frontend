# Two stages: Node builds the bundle, nginx serves it. Nothing from the build
# stage reaches the final image except dist/, so no Node runtime ships.

FROM docker.io/library/node:20-alpine AS build
WORKDIR /app

# npm install rather than npm ci: this repository ships no package-lock.json, so
# there is nothing for ci to install from. That also means builds are not
# reproducible -- two builds a week apart can resolve different transitive
# versions. Committing a lockfile upstream would fix it.
COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

# Vite inlines VITE_* at build time, so these are build args rather than runtime
# environment: changing them on a running container has no effect. With the
# nginx reverse proxy in devops/nginx.conf both point at this deployment's own
# origin -- the API is same-origin, not a separate host.
ARG VITE_DJANGO_BACKEND_URL
ARG VITE_WEBSOCKET_URL
ARG VITE_APP_ENVIRONMENT=production
ENV VITE_DJANGO_BACKEND_URL=$VITE_DJANGO_BACKEND_URL \
    VITE_WEBSOCKET_URL=$VITE_WEBSOCKET_URL \
    VITE_APP_ENVIRONMENT=$VITE_APP_ENVIRONMENT

# app:build rather than build: the full "build" script also builds docs-site,
# which pulls a second npm install and is not needed to serve the application.
#
# Node's default old-space cap is around 2 GB and this bundle exhausts it --
# Rollup dies with "Ineffective mark-compacts near heap limit" partway through
# transforming. The host has far more than this available; the limit is Node's,
# not the machine's.
RUN NODE_OPTIONS=--max-old-space-size=6144 npm run app:build

FROM docker.io/library/nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
