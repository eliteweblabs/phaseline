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

# Production stage - use Node.js to serve static files (simpler than nginx)
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Install serve package for static file serving
RUN npm install -g serve@14.2.3

# Verify files were copied correctly
RUN echo "=== Contents of dist ===" && \
    ls -la dist/ | head -30 && \
    echo "=== Logo files ===" && \
    (ls -la dist/logo*.webp 2>&1 || echo "Logo files not found") && \
    echo "=== Testing logo file access ===" && \
    (test -f dist/logo-light.webp && echo "✅ logo-light.webp EXISTS" || echo "❌ logo-light.webp MISSING") && \
    echo "=== Assets directory ===" && \
    (ls -la dist/assets/ 2>&1 | head -10 || echo "Assets directory not found") && \
    echo "=== Assets/images ===" && \
    (ls -la dist/assets/images/ 2>&1 | head -5 || echo "Assets/images not found") && \
    echo "=== Collections/work ===" && \
    (ls -la dist/collections/work/ 2>&1 | head -5 || echo "Collections/work not found") && \
    echo "=== Fonts directory ===" && \
    (ls -la dist/fonts/ 2>&1 | head -5 || echo "Fonts directory not found") && \
    echo "=== Bgs directory ===" && \
    (ls -la dist/bgs/ 2>&1 | head -5 || echo "Bgs directory not found") && \
    echo "=== Total files in dist ===" && \
    find dist -type f | wc -l

# Expose port
EXPOSE 8080

# Start serve with Railway's PORT
# serve binds to 0.0.0.0 by default when using -l flag
# No -s flag needed - serve handles static files correctly by default
CMD ["sh", "-c", "PORT=${PORT:-8080} serve dist -l $PORT"]

