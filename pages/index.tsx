import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { wrapper } from '../app/redux/store'
import { addHeaderTranslation } from '../app/helpers'
import {
  getFilters,
  getRunningOperationPromises,
  LocaleType,
  useGetFiltersQuery,
} from '../app/features/filters/Sort/sortService'
import ChooseFilterButton from '../app/components/controls/Buttons/ChooseFilterButton/ChooseFilterButton'

const Home: NextPage = (props) => {
  const { locale } = useRouter()
  const { t } = useTranslation(['home'])
  const { data } = useGetFiltersQuery({ locale: locale as LocaleType })

  return (
    <>
      <ChooseFilterButton onClick={() => console.log('Clicked!')} isActive>
        Все
      </ChooseFilterButton>
      <ChooseFilterButton onClick={() => console.log('Clicked!')}>Мясные</ChooseFilterButton>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale } = context

    store.dispatch(getFilters.initiate({ locale: locale as string }))

    await Promise.all(getRunningOperationPromises())

    return {
      props: {
        ...(await addHeaderTranslation(context)),
      },
    }
  }
)

export default Home
