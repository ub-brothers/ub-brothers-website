/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  images: {
    unoptimized: true // Important to avoid Next.js image optimization on export
  },
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
