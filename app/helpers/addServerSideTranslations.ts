import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const addServerSideTranslations = async (namespaces: string[], context: any) => {
  const { locale, defaultLocale } = context

  return await serverSideTranslations(locale ?? defaultLocale ?? 'uk', [...namespaces])
}
