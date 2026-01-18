FROM ghcr.io/gohugoio/hugo:v0.154.0 AS builder
WORKDIR /app
COPY . .
RUN hugo --gc --minify

FROM nginx:alpine AS runner
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
