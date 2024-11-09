/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: 'https://pdf2llm-d4y3d99yh-maximus305s-projects.vercel.app/api/upload',
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
    responseLimit: false,
  },
};

export default nextConfig;