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
  // Remove any experimental.serverActions if you have it
  // Remove any api configuration if you have it
};

export default nextConfig;