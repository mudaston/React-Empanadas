/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  images: {
    domains: ['localhost', 'i.postimg.cc'],
  },
  env: {
    API_URL: 'http://127.0.0.1:3000/api',
    CURRENT_LOCALE: i18n.defaultLocale,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://v6.exchangerate-api.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
