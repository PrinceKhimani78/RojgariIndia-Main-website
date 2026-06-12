import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "1000logos.net" },
      { protocol: "https", hostname: "logos-world.net" },
      { protocol: "https", hostname: "imgcdn.stablediffusionweb.com" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "seeklogo.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "localhost", port: "4000" },
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "https", hostname: "api.rojgariindia.com" },
      { protocol: "https", hostname: "api.mutanttechnologies.com" },
      { protocol: "https", hostname: "**" },
    ],
  },

  async rewrites() {
    // In local dev, proxy to localhost:4000. In production, proxy to the live backend.
    const isDev = process.env.NODE_ENV !== 'production';
    const backendBase = process.env.BACKEND_INTERNAL_URL || (isDev ? 'http://localhost:4000' : 'https://api.rojgariindia.com');
    return [
      {
        source: '/api/:path*',
        destination: `${backendBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
