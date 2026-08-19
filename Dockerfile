FROM oven/bun:alpine
WORKDIR /app
COPY .npmrc package.json bun.lock ./
RUN bun install
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev", "--", "--host", "--port", "3000"]
