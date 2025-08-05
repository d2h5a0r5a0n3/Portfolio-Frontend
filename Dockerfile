# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --cache /tmp/.npm --prefer-offline
COPY . .
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine

# Ensure path is correct - check `angular.json` outputPath!
COPY --from=build /app/dist/portifolio/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
