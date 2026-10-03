import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        // With `output: "export"` a custom distDir IS the export folder;
        // build intermediates still go to .next.
        distDir: "dist",
        output: "export",
        trailingSlash: true,
      }
    : {}),
  // Every image on the page is pre-sized on disk (WebP thumbs, a 96px logo,
  // a rasterised seal), so the files are served exactly as they are, from
  // the CDN, in both build modes. The Vercel /_next/image optimizer was
  // returning the untouched 2.4 MB logo master for a 64px request — with it
  // out of the path, its transformation quotas no longer apply either.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
