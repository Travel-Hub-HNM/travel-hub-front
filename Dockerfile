# 베이스 이미지 선택
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 복사 및 설치
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN pnpm start:build

# 런타임용 이미지 생성
FROM node:18-alpine
WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# 실행 포트 설정
EXPOSE 3000

# Next.js 실행
CMD ["pnpm", "start:prod"]