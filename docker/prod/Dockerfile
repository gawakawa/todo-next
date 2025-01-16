FROM node:20-slim AS base

ENV YARN_VERSION 4.6.0
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

FROM base AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./
COPY package.json yarn.lock* ./
RUN yarn install

COPY . .

RUN yarn build


FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE ${PORT}

CMD ["node", "server.js"]

