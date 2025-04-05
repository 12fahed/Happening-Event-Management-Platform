/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
    unoptimized: true,
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'api.qrserver.com'],
  },
  webpack: (config) => {
    // Resolve aliases
    config.resolve.alias["@"] = "/src"; // Adjust the path as needed

    return config;
  },
};

export default nextConfig;
