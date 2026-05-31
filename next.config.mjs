/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.duffel.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
// .
