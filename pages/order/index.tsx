import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { addServerSideTranslations, headerTranslationNamespaces } from '../../app/helpers'

import { Button } from '../../app/components/controls'
import EmpanadasOrderList from '../../app/features/empanadasOrder/EmpanadasOrderList/EmpanadasOrderList'
import OrderInfo from '../../app/components/OrderInfo/OrderInfo'

import style from './index.module.scss'

interface OwnProps {}

type Props = OwnProps

const Order: NextPage<Props> = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Altanka | order</title>
      </Head>
      <section className={style['basket']}>
        <header className={style['basket__header']}>
          <div className={style['basket__title-wrapper']}>
            <div className={style['basket__icon']}>
              <span className='icon-shopping-cart' />
            </div>
            <h2 className={style['basket__title']}>Корзина</h2>
          </div>
          <Button type={'empty-basket-button'}>
            <Button.Icon fontSize={'18px'}>
              <span className='icon-trash' />
            </Button.Icon>
            <Button.LabelRegular>Очистить корзину</Button.LabelRegular>
          </Button>
        </header>
        <main className={style['basket__order-list']}>
          <div className={style['basket__order-list-item']}>
            <EmpanadasOrderList />
            <div className={style['basket__order-list-item-info']}>
              <OrderInfo />
            </div>
          </div>
        </main>
        <footer className={style['basket__footer']}>
          <Button type={'get-back-button-with-icon'} onClick={() => router.back()}>
            <Button.Icon fontSize={'12px'}>
              <span className='icon-chevron-left-solid' />
            </Button.Icon>
            <Button.LabelRegular>Вернуться назад</Button.LabelRegular>
          </Button>
          <Button type={'pay-now-button'}>
            <Button.LabelBold>Оплатить сейчас</Button.LabelBold>
          </Button>
        </footer>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await addServerSideTranslations(headerTranslationNamespaces, context)),
    },
  }
}

export default Order
