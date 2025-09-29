# --- Backend Dockerfile ---
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app source
COPY lib/ ./lib/
COPY config/default.json ./config/default.json
COPY .env .env

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "lib/index.js"]
