// @ts-check

/** @type {import('zod').ZodSchema} */
const { z } = require('zod');

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:3000';

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_ORIGIN}/api/:path*`,
      },
    ];
  },
};