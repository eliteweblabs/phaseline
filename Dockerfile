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

# Copy contents of dist directory
COPY --from=builder /app/dist/. /usr/share/nginx/html/

# Verify files were copied correctly
RUN echo "=== Contents of /usr/share/nginx/html ===" && \
    ls -la /usr/share/nginx/html/ | head -30 && \
    echo "=== Logo files ===" && \
    ls -la /usr/share/nginx/html/logo*.webp 2>&1 || echo "Logo files not found" && \
    echo "=== Assets directory ===" && \
    ls -la /usr/share/nginx/html/assets/ 2>&1 | head -10 || echo "Assets directory not found" && \
    echo "=== Assets/images ===" && \
    ls -la /usr/share/nginx/html/assets/images/ 2>&1 | head -5 || echo "Assets/images not found" && \
    echo "=== Collections/work ===" && \
    ls -la /usr/share/nginx/html/collections/work/ 2>&1 | head -5 || echo "Collections/work not found" && \
    echo "=== Fonts directory ===" && \
    ls -la /usr/share/nginx/html/fonts/ 2>&1 | head -5 || echo "Fonts directory not found"

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy startup script
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# Expose port
EXPOSE 8080

# Start nginx with dynamic port
CMD ["/start-nginx.sh"]

