# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --cache /tmp/.npm --prefer-offline
COPY . .
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine

# ✅ Fix: Correct build path (NO /browser!)
COPY --from=build /app/dist/portifolio /usr/share/nginx/html

# Optional: Include a custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
