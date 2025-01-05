FROM node:22.12.0-alpine AS base

ENV NEXT_TELEMETRY_DISABLED 1
ENV YARN_VERSION 4.6.0

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile 

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
arg env_variable
env env_variable=${env_variable}
arg next_public_env_variable
env next_public_env_variable=${next_public_env_variable}

RUN yarn build

FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}


# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]

