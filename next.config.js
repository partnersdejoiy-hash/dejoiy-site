/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN || "",
    "*.replit.dev",
    "*.janeway.replit.dev"
  ].filter(Boolean)
};

module.exports = nextConfig;