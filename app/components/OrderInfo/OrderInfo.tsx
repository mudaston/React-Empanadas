import { FC } from 'react'

import style from './OrderInfo.module.scss'

interface OwnProps {}

type Props = OwnProps

const OrderInfo: FC<Props> = () => {
  return (
    <div className={style['order-info']}>
      <div className={style['order-info__total-pizzas']}>
        Всего пицц: <span className={style['order-info__total-pizzas-amount']}>3 шт.</span>
      </div>
      <div className={style['order-info__order-price']}>
        Сумма заказа: <span className={style['order-info__order-price-sum']}>900 Р</span>
      </div>
    </div>
  )
}

export default OrderInfo
