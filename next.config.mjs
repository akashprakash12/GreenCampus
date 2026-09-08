/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;