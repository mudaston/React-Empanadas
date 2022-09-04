import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { basketOrderSum, empanadasAmount } from '../../redux/selectors/basket'

import style from './OrderInfo.module.scss'
import { useSelector } from 'react-redux'
import { useExchangeCurrency } from '../../hooks/useExchangeCurrency'

interface OwnProps {}

type Props = OwnProps

const OrderInfo: FC<Props> = () => {
  const empanadasOrderAmount = useSelector(empanadasAmount)
  const empanadasOrderSum = useSelector(basketOrderSum)
  const { t } = useTranslation(['basket', 'currencies'])
  const { exchangeCurrency } = useExchangeCurrency()

  return (
    <div className={style['order-info']}>
      <div className={style['order-info__total-pizzas']}>
        {t('basket:total_empanadas')}:&nbsp;
        <span className={style['order-info__total-pizzas-amount']}>{empanadasOrderAmount}</span>
      </div>
      <div className={style['order-info__order-price']}>
        {t(['basket:order_price'])}:&nbsp;
        <span className={style['order-info__order-price-sum']}>
          {exchangeCurrency(empanadasOrderSum)} {t('currencies:currency')}
        </span>
      </div>
    </div>
  )
}

export default OrderInfo
