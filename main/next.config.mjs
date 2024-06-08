/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path/:more*',
        destination: 'http://localhost:8080/:path/:more*',   
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  }
};

export default nextConfig;
