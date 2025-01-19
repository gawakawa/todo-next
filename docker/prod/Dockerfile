FROM node:20 AS base

ENV YARN_VERSION 4.6.0
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

FROM base AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./
COPY package.json yarn.lock* ./
COPY next.config.ts ./ 
COPY tsconfig.json ./
COPY public ./public
COPY prisma ./prisma
COPY src ./src
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY .env.production.local .env

RUN yarn install

RUN yarn dlx prisma generate
RUN yarn dlx prisma migrate deploy

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

