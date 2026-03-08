import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression (Brotli/gzip) in production via host
  // Optimize for Core Web Vitals and SEO
  poweredByHeader: false,
  // Ensure Tailwind is resolved from project (fixes pnpm + Tailwind v4 "doesn't exist")
  transpilePackages: ["tailwindcss", "@tailwindcss/postcss"],
  // Use current dir as Turbopack root so module resolution stays in this package
  turbopack: { root: process.cwd() },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
