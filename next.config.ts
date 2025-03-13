import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: true,
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
}

export default nextConfig
