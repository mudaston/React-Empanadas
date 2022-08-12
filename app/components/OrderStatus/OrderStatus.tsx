import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import ReactTooltip from 'react-tooltip'

import { basketItemsAmount, basketOrderSum } from '../../redux/selectors/basket'
// import { useExchangeCurrency } from '../../hooks/useExchangeCurrency'
import { routerPaths } from '../../helpers/router-paths'

import style from './OrderStatus.module.scss'
import colors from '../../../styles/colors.module.scss'

interface OwnProps {}

type Props = OwnProps

const OrderStatus: FC<Props> = (props) => {
  const { t } = useTranslation(['currencies', 'order-status'])
  const [showToolTip, setShowToolTip] = useState(false)
  const itemsAmount = useSelector(basketItemsAmount)
  const orderSum = useSelector(basketOrderSum)
  // const { exchangeCurrency } = useExchangeCurrency()

  useEffect(() => {
    setShowToolTip(true)

    return () => {
      setShowToolTip(false)
    }
  }, [])

  return (
    <Link href={routerPaths.order} scroll={false}>
      <a className={style['order-status']}>
        <span
          className={style['order-status__sum']}
          data-tip={t('order-status:order_price')}
          data-for='order-sum'
        >
          {orderSum} {t('currencies:currency')}
        </span>
        <div className={style['order-status__divider']} />
        <div
          className={`${style['order-status__shopping-cart']}`}
          data-tip={t('order-status:number_of_items_in_order')}
          data-for='shopping-cart'
        >
          <span className={'icon-shopping-cart'} />
          {itemsAmount}
        </div>
        {showToolTip && (
          <>
            <ReactTooltip
              id='order-sum'
              textColor={colors.textColorSecondary}
              backgroundColor={colors.tooltipBackgroundColor}
              type={'dark'}
              effect={'solid'}
              place={'bottom'}
              delayShow={200}
              delayHide={200}
              clickable={true}
            />
            <ReactTooltip
              id='shopping-cart'
              textColor={colors.textColorSecondary}
              backgroundColor={colors.tooltipBackgroundColor}
              type={'dark'}
              effect={'solid'}
              place={'bottom'}
              delayShow={200}
              delayHide={200}
              clickable={true}
            />
          </>
        )}
      </a>
    </Link>
  )
}

export default OrderStatus
