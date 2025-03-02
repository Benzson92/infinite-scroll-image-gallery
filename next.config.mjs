/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "", // Leave empty unless the URL specifies a port
        pathname: "/**", // Allows all paths under picsum.photos
      },
    ],
  },
};

export default nextConfig;
