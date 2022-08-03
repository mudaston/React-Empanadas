import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const addHeaderTranslation = async (context: any) => {
  const { locale, defaultLocale } = context

  return await serverSideTranslations(locale ?? defaultLocale ?? 'uk', [
    'header',
    'basket-header',
    'currencies',
    'order-status',
  ])
}
