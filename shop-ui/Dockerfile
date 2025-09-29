# --- Builder ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (cache friendly)
COPY package*.json ./
RUN npm install

# Copy only what’s needed for build (App Router inside src/)
COPY next.config.ts ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

# Build standalone app
RUN npm run build


# --- Production (standalone) ---
FROM node:18-alpine AS runner

WORKDIR /app
# Copy only the build artifacts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# (optional) keep package.json if telemetry / tooling / version reads
COPY --from=builder /app/package.json ./ 

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME=0.0.0.0

EXPOSE 4000
CMD ["npm", "run", "stand:start"]


