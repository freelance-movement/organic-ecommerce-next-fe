import type { NextConfig } from 'next';

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:3000';

const nextConfig: NextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${BACKEND_ORIGIN}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
