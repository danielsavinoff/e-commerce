/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sign-in/:path/:more*',
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
