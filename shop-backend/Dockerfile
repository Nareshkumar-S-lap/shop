FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and config
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY config/default.json ./config/default.json

# Build TypeScript (npm run build)
RUN npm run build

# Build-time arguments
ARG MONGO_URI
ARG DB_NAME
ARG PORT

# Set runtime environment from ARGs
ENV MONGO_URI=${MONGO_URI}
ENV DB_NAME=${DB_NAME}
ENV PORT=${PORT}
ENV HOST=0.0.0.0

# Expose the port dynamically from ARG
EXPOSE ${PORT}

# Run the compiled backend
CMD ["node", "lib/index.js"]
