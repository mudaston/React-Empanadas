import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { LanguageSwitcher, MainContainer } from '../app/components'

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale ?? 'uk', ['common'])),
    },
  }
}

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <MainContainer>
      <LanguageSwitcher />
      <h1>{t('common:currency')}</h1>
    </MainContainer>
  )
}

export default Home
