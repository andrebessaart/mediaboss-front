import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      // ADICIONADO: Domínio do Instagram retornado pela API
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      // ADICIONADO: Domínio do seu bucket S3 (para suas próprias mídias)
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      // ADICIONADO: Domínio para as imagens de placeholder
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
