import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import {
  getFilters,
  getRunningOperationPromises,
  LocaleType,
  useGetFiltersQuery,
} from '../app/features/filters/Sort/sortService'
import { MainContainer } from '../app/components'
import { wrapper } from '../app/redux/store'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation(['home'])
  const { data } = useGetFiltersQuery({ locale: locale as LocaleType })

  return (
    <MainContainer>
      <h1>Hello world!</h1>
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
        ...(await serverSideTranslations(locale ?? defaultLocale ?? 'uk', ['common', 'home'])),
      },
    }
  }
)

export default Home
