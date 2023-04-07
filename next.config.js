/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["content.wepik.com", "dweb.link", "ipfs.io"],
  },
};

module.exports = nextConfig;
