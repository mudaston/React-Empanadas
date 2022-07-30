/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  images: {
    domains: ['github.com', 'localhost'],
  },
}

module.exports = nextConfig
