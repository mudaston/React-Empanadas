import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import { addServerSideTranslations, headerTranslationNamespaces } from '../../app/helpers'
import { routerPaths } from '../../app/helpers/router-paths'
import { wrapper } from '../../app/redux/store'
import { emptyBasket } from '../../app/redux/slices/basket-slice'
import { empanadasBasketItems } from '../../app/redux/selectors/basket'

import { Button } from '../../app/components/controls'
import EmpanadasOrderList from '../../app/features/empanadasOrder/EmpanadasOrderList/EmpanadasOrderList'
import OrderInfo from '../../app/components/OrderInfo/OrderInfo'
import BasketIsEmpty from '../../app/components/BasketIsEmpty/BasketIsEmpty'

import style from './index.module.scss'

interface OwnProps {}

type Props = OwnProps

const Order: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Altanka | order</title>
      </Head>
      <section className={style['basket']}>
        <View />
      </section>
    </>
  )
}

const View: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const empanadasBasket = useSelector(empanadasBasketItems)
  const { t } = useTranslation(['basket', 'common'])

  return empanadasBasket.length ? (
    <>
      <header className={style['basket__header']}>
        <div className={style['basket__title-wrapper']}>
          <div className={style['basket__icon']}>
            <span className='icon-shopping-cart' />
          </div>
          <h2 className={style['basket__title']}>{t('basket:basket')}</h2>
        </div>
        <Button type={'empty-basket-button'} onClick={() => dispatch(emptyBasket())}>
          <Button.Icon fontSize={'18px'}>
            <span className='icon-trash' />
          </Button.Icon>
          <Button.LabelRegular>{t('basket:empty_basket')}</Button.LabelRegular>
        </Button>
      </header>
      <div className={style['basket__order-list']}>
        <div className={style['basket__order-list-item']}>
          <EmpanadasOrderList />
          <div className={style['basket__order-list-item-info']}>
            <OrderInfo />
          </div>
        </div>
      </div>
      <footer className={style['basket__footer']}>
        <Button type={'get-back-button-with-icon'} onClick={() => router.push(routerPaths.home)}>
          <Button.Icon fontSize={'12px'}>
            <span className='icon-chevron-left-solid' />
          </Button.Icon>
          <Button.LabelRegular>{t('common:come_back')}</Button.LabelRegular>
        </Button>
        <Button type={'pay-now-button'}>
          <Button.LabelBold>{t('basket:pay_now')}</Button.LabelBold>
        </Button>
      </footer>
    </>
  ) : (
    <BasketIsEmpty />
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (state) => async (context) => {
    return {
      props: {
        ...(await addServerSideTranslations(
          [...headerTranslationNamespaces, 'basket', 'common'],
          context
        )),
      },
    }
  }
)

export default Order
