import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "serebii.net",
        port: "",
        pathname: "/tcgpocket/**",
      },
    ],
  },
};

export default nextConfig;
