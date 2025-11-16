FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built files to nginx
# Note: COPY copies the directory contents when the destination ends with /
COPY --from=builder /app/dist/. /usr/share/nginx/html/

# Verify files were copied correctly
RUN ls -la /usr/share/nginx/html/ | head -20 && \
    ls -la /usr/share/nginx/html/logo*.webp 2>&1 || echo "Logo files not found" && \
    ls -la /usr/share/nginx/html/assets/ 2>&1 | head -5 || echo "Assets directory not found"

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy startup script
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# Expose port
EXPOSE 8080

# Start nginx with dynamic port
CMD ["/start-nginx.sh"]

