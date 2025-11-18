# Backend/Dockerfile
FROM oven/bun:1.3.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
RUN bun install --no-verify

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Production stage
FROM base AS runner
WORKDIR /app

# Copy necessary files (NO USER CREATION - runs as root)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./

# Create temp directory
RUN mkdir -p /app/temp

EXPOSE 5000

CMD ["bun", "run", "start"]