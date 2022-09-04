import { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
  decrementEmpanadaByID,
  deleteEmpanadaByID,
  incrementEmpanadaByID,
} from '../../../redux/slices/basket-slice'
import { empanadaAmountByID, empanadaCostByID } from '../../../redux/selectors/basket'
import { useExchangeCurrency } from '../../../hooks/useExchangeCurrency'

import { Button } from '../../../components/controls'

import style from './EmpanadasOrderItem.module.scss'

interface OwnProps {
  id: number
  name: string
  image: string
}

type Props = OwnProps

const EmpanadasOrderItem: FC<Props> = ({ id, name, image }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['currencies'])
  const empanadaAmount = useAppSelector(empanadaAmountByID(id))
  const cost = useAppSelector(empanadaCostByID(id))
  const { exchangeCurrency } = useExchangeCurrency()

  return (
    <article className={style['empanada-order-item']}>
      <div className={style['empanada-order-item__wrapper']}>
        <header className={style['empanada-order-item__header']}>
          <div className={style['empanada-order-item__image']}>
            <Image src={image} layout={'fill'} alt={name} />
          </div>
          <span className={style['empanada-order-item__title']}>{name}</span>
        </header>
        <div className={style['empanada-order-item__main']}>
          <Button
            ariaLabel={'increment item'}
            type={'rounded-button-orange'}
            onClick={() => dispatch(decrementEmpanadaByID(id))}
          >
            <Button.Icon type={'weightless'} fontSize={'2px'}>
              <span className='icon-minus-icon' />
            </Button.Icon>
          </Button>
          <span className={style['empanada-order-item__amount']}>{empanadaAmount}</span>
          <Button
            ariaLabel={'decrement item'}
            type={'rounded-button-orange'}
            onClick={() => dispatch(incrementEmpanadaByID(id))}
          >
            <Button.Icon type={'weightless'} fontSize={'11px'}>
              <span className='icon-plus-icon' />
            </Button.Icon>
          </Button>
        </div>
      </div>
      <footer className={style['empanada-order-item__footer']}>
        <span className={style['empanada-order-item__sum']}>
          {exchangeCurrency(cost)}&nbsp;{t('currencies:currency')}
        </span>
        <Button
          ariaLabel={'delete item'}
          type={'rounded-button-grey'}
          onClick={() => dispatch(deleteEmpanadaByID(id))}
        >
          <Button.Icon type={'weightless'} transform={'rotate(45deg)'} fontSize={'11px'}>
            <span className='icon-plus-icon' />
          </Button.Icon>
        </Button>
      </footer>
    </article>
  )
}

export default EmpanadasOrderItem
