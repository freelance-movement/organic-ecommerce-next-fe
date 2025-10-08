import type { NextConfig } from 'next';

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:3000';

const nextConfig: NextConfig = {
    output: 'standalone',
    
    // SEO optimizations
    compress: true,
    poweredByHeader: false,
    
    // Image optimization
    images: {
        domains: ['images.unsplash.com', 'player.vimeo.com', 'vietroot.com'],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    
    // Headers for SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    
    // Redirects for SEO
    async redirects() {
        return [
            // Add any URL redirects here for SEO purposes
        ];
    },
    
    // API rewrites
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
