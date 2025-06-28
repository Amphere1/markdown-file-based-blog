// next.config.ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// ✅ Wrap MDX support
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // ✅ Optional: enable Rust compiler (faster MDX)
  experimental: {
    mdxRs: true,
  },

  // ✅ Enable loading .md and .mdx files as pages or modules
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

// ✅ Export config with MDX enabled
export default withMDX(nextConfig);
