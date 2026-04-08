/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : "",
    process.env.REPLIT_DEV_DOMAIN || "",
  ].filter(Boolean),
  webpack(config, { dev }) {
    if (dev) {
      config.optimization.moduleIds = "deterministic";
      config.optimization.chunkIds = "deterministic";
    }
    return config;
  },
};

module.exports = nextConfig;
