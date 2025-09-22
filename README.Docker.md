# Docker Setup for Organic E-commerce Frontend

## Multi-stage Production Dockerfile

Dockerfile được tối ưu với 3 stages:

1. **Dependencies Stage**: Cài đặt dependencies
2. **Builder Stage**: Build ứng dụng Next.js
3. **Runtime Stage**: Chạy ứng dụng với image tối ưu

## Features

- ✅ Node.js 22 Alpine (image nhỏ gọn)
- ✅ Multi-stage build để giảm kích thước image
- ✅ Non-root user để bảo mật
- ✅ Output standalone cho production
- ✅ Health check
- ✅ Hỗ trợ npm, yarn, pnpm

## Build & Run

### Production

```bash
# Build image
docker build -t organic-frontend .

# Run container
docker run -p 3001:3000 -e BACKEND_ORIGIN=http://localhost:3000 organic-frontend

# Hoặc dùng docker-compose
docker-compose up -d
```

### Development

```bash
# Run development với hot reload
docker-compose -f docker-compose.dev.yml up -d
```

## Environment Variables

- `BACKEND_ORIGIN`: URL của backend API (default: http://localhost:3000)
- `NODE_ENV`: Environment mode (production/development)
- `NEXT_TELEMETRY_DISABLED`: Tắt Next.js telemetry

## Commands

```bash
# Build production image
docker build -t organic-frontend .

# Run production container
docker run -p 3001:3000 organic-frontend

# Build development image
docker build -f Dockerfile.dev -t organic-frontend:dev .

# Check image size
docker images organic-frontend

# View logs
docker logs <container_id>
```

## Image Size Optimization

- Sử dụng Alpine Linux (nhỏ gọn)
- Multi-stage build loại bỏ build dependencies
- Output standalone chỉ copy file cần thiết
- .dockerignore loại bỏ file không cần thiết
