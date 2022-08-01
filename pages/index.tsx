import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import {
  getFilters,
  getRunningOperationPromises,
  LocaleType,
  useGetFiltersQuery,
} from '../app/features/filters/Sort/sortService'
import { LanguageSwitcher, MainContainer } from '../app/components'
import { wrapper } from '../app/redux/store'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Logo from '../app/assets/img/logo.png'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { data } = useGetFiltersQuery({ locale: locale as LocaleType })

  return (
    <MainContainer>
      <div>
        <Image src={Logo} alt='Logo' />
      </div>
      <LanguageSwitcher />
      <h1>{t('common:currency')}</h1>
      <ul>
        {data?.map((filter) => (
          <li key={filter}>{filter}</li>
        ))}
      </ul>
    </MainContainer>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, defaultLocale } = context

    store.dispatch(getFilters.initiate({ locale: locale as string }))

    await Promise.all(getRunningOperationPromises())

    return {
      props: {
        ...(await serverSideTranslations(locale ?? defaultLocale ?? 'uk', ['common'])),
      },
    }
  }
)

export default Home
