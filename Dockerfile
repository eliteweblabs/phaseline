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

# Production stage - run Astro's built-in Node.js server
FROM node:20-alpine

WORKDIR /app

# Copy package files for production dependencies
COPY --from=builder /app/package*.json ./

# Install only production dependencies (needed for SSR runtime)
RUN npm ci --omit=dev

# Copy built files from builder stage (includes server and static files)
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start Astro server
CMD ["node", "./dist/server/entry.mjs"]

