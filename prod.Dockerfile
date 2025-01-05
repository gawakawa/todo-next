FROM node:22.12.0-slim AS base

ENV YARN_VERSION 4.6.0
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

FROM base AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}
COPY package.json yarn.lock* ./
RUN yarn install --immutable

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build


FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE ${PORT}

CMD ["node", "server.js"]

