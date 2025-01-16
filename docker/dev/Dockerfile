FROM node:20

ENV YARN_VERSION 4.6.0

WORKDIR /app

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

COPY package.json yarn.lock* ./
RUN yarn install --immutable

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .

CMD ["yarn", "dev"]

