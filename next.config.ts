import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH (e.g. "/portfolio") when the site is served from a
// sub-path such as a GitHub Pages project site. Leave it empty for a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
