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
    ls -la dist/logo*.webp 2>&1 || echo "Logo files not found" && \
    echo "=== Assets directory ===" && \
    ls -la dist/assets/ 2>&1 | head -10 || echo "Assets directory not found" && \
    echo "=== Fonts directory ===" && \
    ls -la dist/fonts/ 2>&1 | head -5 || echo "Fonts directory not found"

# Expose port
EXPOSE 8080

# Start serve with Railway's PORT
# serve binds to 0.0.0.0 by default when using -l flag
CMD ["sh", "-c", "PORT=${PORT:-8080} serve dist -l $PORT"]

