# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built app from the previous stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (the default port nginx runs on inside the container)
EXPOSE 80

# Command to run nginx (already defined in the base image, but explicit is ok)
CMD ["nginx", "-g", "daemon off;"]