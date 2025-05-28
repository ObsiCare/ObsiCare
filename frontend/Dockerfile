# Tahap build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Tahap production - gunakan Nginx
FROM nginx:alpine

# Copy hasil build ke direktori Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy default nginx config
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
