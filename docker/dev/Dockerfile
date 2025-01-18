FROM node:20

ENV YARN_VERSION 4.6.0

WORKDIR /app

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

COPY package.json yarn.lock* ./

RUN yarn install

COPY src ./src
COPY public ./public
COPY __tests__ ./__tests__
COPY prisma ./prisma
COPY .yarn ./.yarn
COPY .env.development.local .env
COPY .yarnrc.yml .
COPY next.config.ts .
COPY tsconfig.json .
COPY .prettierrc .
COPY eslint.config.mjs .
COPY jest.config.ts .
COPY .stylelintrc.json .
COPY postcss.config.mjs .
COPY tailwind.config.ts .

RUN yarn dlx prisma generate

CMD ["yarn", "dev"]

