# Multi-stage Dockerfile for Next.js application with Node 22

# -------- Stage 1: Dependencies --------
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies (auto-detect package manager)
RUN corepack enable && \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps || npm i --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile --strict-peer-dependencies=false; \
  else npm install --no-audit --no-fund --legacy-peer-deps; \
  fi

# -------- Stage 2: Builder --------
FROM node:22-alpine AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
# Copy source
COPY . .

# Build-time public env for Next.js (sẽ được "bake" vào bundle client)
ARG NEXT_PUBLIC_API_BASE
ARG NEXT_PUBLIC_BACKEND_ORIGIN
ENV NEXT_PUBLIC_API_BASE=${NEXT_PUBLIC_API_BASE}
ENV NEXT_PUBLIC_BACKEND_ORIGIN=${NEXT_PUBLIC_BACKEND_ORIGIN}

# Optional: tắt telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build
RUN corepack enable && \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# -------- Stage 3: Runtime --------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Public assets
COPY --from=builder /app/public ./public

# Next standalone output
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose
USER nextjs
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Start (server.js đến từ .next/standalone)
CMD ["node", "server.js"]
