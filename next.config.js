const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'roky.rocks',
      'c.roky.rocks',
      'pro.c.roky.rocks',
      'live-scout.pro.c.roky.rocks',
      'test.live-scout.pro.c.roky.rocks',
      'img.youtube.com',
      'scout.livesport-pro.com',
      'livesport-pro.com',
      'test.livesport-pro.com',
    ],
    minimumCacheTTL: 60,
  },
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `@import 'variables';`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/svgr/] },
          type: 'asset/resource',
        },
        {
          issuer: /\.[jt]sx?$/,
          resourceQuery: /svgr/,
          use: ['@svgr/webpack'],
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
