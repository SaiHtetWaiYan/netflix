/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "mango.blender.org",
      "download.blender.org",
      "m.media-amazon.com",
      "loremflickr.com",
    ],
  },
};

module.exports = nextConfig;
