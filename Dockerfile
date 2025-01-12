# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件并安装
COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm run build

# 生产阶段
FROM node:18-alpine AS runner
WORKDIR /app

LABEL maintainer="Michael1Peng <michael1peng@outlook.com>"
LABEL description="Sales script management application built with Next.js"
LABEL version="1.0.0"

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
