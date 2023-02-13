/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  images: {
    domains: ['localhost', 'i.postimg.cc', 'github.com'],
  },
  env: {
    API_URL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000/api'
        : 'https://main--stalwart-malasada-ebd528.netlify.app/api',
    CURRENT_LOCALE: i18n.defaultLocale,
  },
}

module.exports = nextConfig
