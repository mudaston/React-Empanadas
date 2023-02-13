// @ts-nocheck
/* eslint-disable */

import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'

import { wrapper } from '../app/redux/store'
import { addServerSideTranslations, headerTranslationNamespaces } from '../app/helpers'

//redux apis
import {
  getCategories,
  getRunningOperationPromises as categoriesOperations,
} from '../app/features/filters/Categories/categories-service'
import {
  getFilters,
  getRunningOperationPromises as filtersOperations,
} from '../app/features/filters/Sort/sort-service'
import {
  getEmpanadas,
  getRunningOperationPromises as empanadasOperations,
} from '../app/features/empanadas/empanadas-service'
import {
  getExchangeRate,
  getRunningOperationPromises as exchangeOperations,
} from '../app/redux/apis/currency-exchange-api'
import Categories from '../app/features/filters/Categories/Categories'
import Sort from '../app/features/filters/Sort/Sort'
import EmpanadasList from '../app/features/empanadas/EmpanadasList/EmpanadasList'

import style from '../styles/pages/index.module.scss'

const Home: NextPage = (props) => {
  const { t } = useTranslation(['home'])

  return (
    <>
      <section className={style['all-empanadas']}>
        <div className={style['all-empanadas__filters']}>
          <Categories />
          <Sort />
        </div>
        <div className={style['all-empanadas__list-wrapper']}>
          <h2 className={style['all-empanadas__title']}>{t('home:all_empanadas')}</h2>
          <div className={style['all-empanadas__list']}>
            <EmpanadasList />
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale } = context

    store.dispatch(getCategories.initiate({ locale: locale as string }))
    store.dispatch(getFilters.initiate({ locale: locale as string }))
    store.dispatch(getEmpanadas.initiate({ locale: locale as string }))
    store.dispatch(getExchangeRate.initiate())

    await Promise.all(
      [
        categoriesOperations(),
        filtersOperations(),
        empanadasOperations(),
        exchangeOperations(),
      ].flat()
    )

    return {
      props: {
        ...(await addServerSideTranslations(
          [...headerTranslationNamespaces, 'common', 'home'],
          context
        )),
      },
    }
  }
)

export default Home
