/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    // async headers() {
    //   return [
    //     {
    //       // Match all routes
    //       source: "/(.*)",
    //       headers: [
    //         { key: "Access-Control-Allow-Origin", value: process.env.NEXTAUTH_URL || "*" },
    //         { key: "Access-Control-Allow-Credentials", value: "true" },
    //         { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
    //         { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
    //       ],
    //     },
    //   ];
    // },
  };
  
  export default nextConfig;