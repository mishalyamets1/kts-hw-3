import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Fix Turbopack workspace root resolution
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'front-school-strapi.ktsdev.ru',
      // },
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
      }
    ]
  }
};

export default nextConfig;
