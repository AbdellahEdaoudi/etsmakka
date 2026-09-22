/** @type {import('next').NextConfig} */
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://etsmakkaserver.vercel.app";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
