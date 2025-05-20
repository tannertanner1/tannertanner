import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
