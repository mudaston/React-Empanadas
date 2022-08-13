import { FC } from 'react'
import Image from 'next/image'

import { Button } from '../../../components/controls'

import style from './EmpanadasOrderItem.module.scss'
import image from '../../../assets/img/logo.png'

interface OwnProps {}

type Props = OwnProps

const EmpanadasOrderItem: FC<Props> = (props) => {
  return (
    <article className={style['empanada-order-item']}>
      <header className={style['empanada-order-item__header']}>
        <div className={style['empanada-order-item__image']}>
          <Image src={image} layout={'fill'} />
        </div>
        <span className={style['empanada-order-item__title']}>Сырный цыпленок</span>
      </header>
      <main className={style['empanada-order-item__main']}>
        <Button type={'rounded-button-orange'}>
          <Button.Icon type={'weightless'} fontSize={'2px'}>
            <span className='icon-minus-icon' />
          </Button.Icon>
        </Button>
        <span className={style['empanada-order-item__amount']}>3</span>
        <Button type={'rounded-button-orange'}>
          <Button.Icon type={'weightless'} fontSize={'11px'}>
            <span className='icon-plus-icon' />
          </Button.Icon>
        </Button>
      </main>
      <footer className={style['empanada-order-item__footer']}>
        <span className={style['empanada-order-item__sum']}>770 Р</span>
        <Button type={'rounded-button-grey'}>
          <Button.Icon transform={'rotate(45deg)'} type={'weightless'} fontSize={'11px'}>
            <span className='icon-plus-icon' />
          </Button.Icon>
        </Button>
      </footer>
    </article>
  )
}

export default EmpanadasOrderItem
