FROM node:22-alpine

RUN npm install -g pnpm@11.1.1

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma/
RUN npx prisma generate

RUN pnpm build

ENV NODE_ENV=production

CMD npx prisma migrate deploy && pnpm start
