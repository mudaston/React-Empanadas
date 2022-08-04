import type { GetServerSideProps, NextPage } from 'next'

import { wrapper } from '../app/redux/store'
import { addServerSideTranslations, headerTranslationNamespaces } from '../app/helpers'
import {
  getCategories,
  getRunningOperationPromises as categoriesOperations,
} from '../app/features/filters/Categories/categories-service'
import {
  getFilters,
  getRunningOperationPromises as filtersOperations,
} from '../app/features/filters/Sort/sort-service'

import Categories from '../app/features/filters/Categories/Categories'
import Sort from '../app/features/filters/Sort/Sort'

import style from '../styles/pages/index.module.scss'

const Home: NextPage = (props) => {
  return (
    <main>
      <section className={style['all-empanadas']}>
        <div className={style['all-empanadas__filters']}>
          <Categories />
          <Sort />
        </div>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, defaultLocale } = context

    store.dispatch(getCategories.initiate({ locale: locale as string }))
    store.dispatch(getFilters.initiate({ locale: locale as string }))

    await Promise.all(categoriesOperations())
    await Promise.all(filtersOperations())

    return {
      props: {
        ...(await addServerSideTranslations([...headerTranslationNamespaces, 'common'], context)),
      },
    }
  }
)

export default Home
