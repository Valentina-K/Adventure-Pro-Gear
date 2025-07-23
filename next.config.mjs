import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts: true,
  trailingSlash: true,
  images: {
    // for component Image from 'next/image'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/164x164',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/180x180',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
