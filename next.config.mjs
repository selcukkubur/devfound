/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'vbzwzmbuftahoanqreww.supabase.co',
      'i.pravatar.cc',
      'upload.wikimedia.org',
      'https://source.unsplash.com',
      'https://ik.imagekit.io'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
      },
    ]
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
