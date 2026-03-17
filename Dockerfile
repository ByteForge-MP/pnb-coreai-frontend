# Step 1: Build stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite build
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:alpine

# Copy dist folder (IMPORTANT difference)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]