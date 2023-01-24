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
    API_URL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000/api'
        : 'https://react-empanadas.herokuapp.com/api',
    CURRENT_LOCALE: i18n.defaultLocale,
  },
}

module.exports = nextConfig
