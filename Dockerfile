FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json tsconfig.json prisma.config.ts ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN pnpm build

ENV NODE_ENV=production

CMD npx prisma migrate deploy && pnpm start
