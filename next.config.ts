import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net', // Permite imagens de todos os subdomínios do Facebook/Instagram CDN
      },
    ],
  },
};

export default nextConfig;
