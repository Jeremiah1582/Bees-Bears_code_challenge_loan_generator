# Stage 1: Dependencies (Can be kept the same)
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# Using npm install is often simpler than npm ci for dev builds
RUN npm install 

# Stage 2: Builder (NOT needed for a simple dev setup! Can be removed for speed)
# We will skip the 'npm run build' step and go straight to development.
# If you remove this, you simplify the file significantly.

# --- SIMPLIFIED DEVELOPMENT RUNNER STAGE ---
# We'll use a single stage based on the 'deps' stage for speed and simplicity.

FROM node:20-alpine AS runner

WORKDIR /app

# Copy all files from the current directory (including source code)
COPY . .

# Copy installed node_modules from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# We do NOT run the build step (npm run build)

# --- CRITICAL CHANGES FOR DEVELOPMENT ---
# 1. Change NODE_ENV to development
ENV NODE_ENV=development 
# 2. Disable telemetry (good)
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# --- CRITICAL CHANGE: Use the Next.js development server command ---
# This enables hot module replacement (HMR) for fast development.
CMD ["npm", "run", "dev"]

# --- Cleanup: Removed unused user setup as running as root is often simpler for dev
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs