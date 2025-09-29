# --- Builder ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY next.config.ts tsconfig.json ./
COPY src ./src

# Build-time environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NODE_ENV
ARG UI_PORT

ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NODE_ENV=${NODE_ENV}
ENV UI_PORT=${UI_PORT}
ENV HOST=0.0.0.0

# Build the standalone Next.js app
RUN npm run build

# --- Production (runner) ---
FROM node:18-alpine AS runner

WORKDIR /app

# Copy build artifacts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./

# Runtime environment
ENV NODE_ENV=${NODE_ENV}
ENV UI_PORT=${UI_PORT}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV HOST=0.0.0.0

# Expose container port
EXPOSE ${UI_PORT}

# Start Next.js using npm script
CMD ["npm", "run", "start:stand"]
