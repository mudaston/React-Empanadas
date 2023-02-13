const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'uk', 'ru'],
    localeDetection: true,
    defaultLocale: 'uk',
    localePath: path.resolve('locales'),
    localeStructure: '{{lng}}/{{ns}}',
  },
}
