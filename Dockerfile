# Stage 1: build the React app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests and install deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN npm build

# Stage 2: serve with Nginx
FROM nginx:stable-alpine
# Remove default site, then copy our build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) custom Nginx config for SPA routing
COPY nginx-dashboard.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
