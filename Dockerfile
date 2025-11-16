FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Verify public folder exists before build
RUN echo "=== Checking public folder before build ===" && \
    ls -la public/ | head -10

# Build the application
RUN npm run build

# Verify dist after build
RUN echo "=== Checking dist after build ===" && \
    ls -la dist/ | head -20 && \
    echo "=== Checking for logo files in dist ===" && \
    ls -la dist/logo*.webp 2>&1 || echo "Logo files not in dist"

# Production stage - use Node.js to serve static files (simpler than nginx)
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Install serve package for static file serving
RUN npm install -g serve@14.2.3

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port
EXPOSE 8080

# Start serve with runtime verification
CMD ["/start.sh"]

