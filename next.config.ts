import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        distDir: ".next-static",
        output: "export",
        trailingSlash: true,
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "svgl.app",
        pathname: "/library/**",
      },
    ],
    ...(isStaticExport
      ? {
          unoptimized: true,
        }
      : {}),
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
