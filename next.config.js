/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/favicon.png", permanent: true },
      // One set of terms and privacy for every DEJOIY platform lives on dejoiy.co.in
      { source: "/privacy", destination: "https://www.dejoiy.co.in/privacy", permanent: false },
      { source: "/terms", destination: "https://www.dejoiy.co.in/terms", permanent: false },
      { source: "/legal", destination: "https://www.dejoiy.co.in/legal#business", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/help/:path*",
        headers: [{ key: "Referrer-Policy", value: "no-referrer" }],
      },
      {
        source: "/staff/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
