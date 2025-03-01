/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds:true,
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: "/images/**",
          },
        ],
      },
      compiler: {
        removeConsole: process.env.NODE_ENV === "production", // Removes console logs in production
    },
    swcMinify: true,
};


export default nextConfig;
