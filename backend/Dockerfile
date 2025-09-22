# ---- Builder ----
FROM node:20-slim AS builder
WORKDIR /app

# Install deps (incl. dev) for building
COPY package*.json ./
RUN npm ci

# Copy sources & build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Runtime ----
FROM node:20-slim
WORKDIR /app

# Only production deps at runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Bring compiled JS only
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
# Render injects PORT; 5000 is just a local default
EXPOSE 5000

CMD ["node", "dist/server.js"]
