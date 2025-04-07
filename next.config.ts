import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-e8e7af7f91bd4696800d3166bf60081f.r2.dev',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
