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
};


export default nextConfig;
