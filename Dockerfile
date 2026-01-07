# Use multi-stage build for optimized image size
FROM node:23-alpine AS builder

# Install build dependencies only if needed for native modules
# RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev --ignore-scripts

# Production stage
FROM node:23-alpine

# Set environment to production
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application code
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs src ./src
COPY --chown=nodejs:nodejs erickwendel-sdk ./erickwendel-sdk

# Switch to non-root user
USER nodejs

# Expose port for HTTP transport (if needed)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "process.exit(0)"

CMD ["node", "--no-warnings", "src/index.ts"]