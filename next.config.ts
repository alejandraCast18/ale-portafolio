import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/projects',
        destination: '/',
      },
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/contact',
        destination: '/',
      },
    ]
  },
}

export default nextConfig
