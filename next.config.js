/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    domains: [],
  },
  // Disable pages directory
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

module.exports = nextConfig;
