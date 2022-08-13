import { FC } from 'react'
import Image from 'next/image'

import { Button } from '../../../components/controls'

import style from './EmpanadasOrderItem.module.scss'
import image from '../../../assets/img/logo.png'

interface OwnProps {
  id?: number
  name?: string
  image?: string
}

type Props = OwnProps

const EmpanadasOrderItem: FC<Props> = ({ id, name }) => {
  return (
    <article className={style['empanada-order-item']}>
      <header className={style['empanada-order-item__header']}>
        <div className={style['empanada-order-item__image']}>
          <Image src={image} layout={'fill'} alt={name} />
        </div>
        <span className={style['empanada-order-item__title']}>Сырный цыпленок</span>
      </header>
      <main className={style['empanada-order-item__main']}>
        <Button ariaLabel={'increment item'} type={'rounded-button-orange'}>
          <Button.Icon type={'weightless'} fontSize={'2px'}>
            <span className='icon-minus-icon' />
          </Button.Icon>
        </Button>
        <span className={style['empanada-order-item__amount']}>3</span>
        <Button ariaLabel={'decrement item'} type={'rounded-button-orange'}>
          <Button.Icon type={'weightless'} fontSize={'11px'}>
            <span className='icon-plus-icon' />
          </Button.Icon>
        </Button>
      </main>
      <footer className={style['empanada-order-item__footer']}>
        <span className={style['empanada-order-item__sum']}>770 Р</span>
        <Button ariaLabel={'delete item'} type={'rounded-button-grey'}>
          <Button.Icon type={'weightless'} transform={'rotate(45deg)'} fontSize={'11px'}>
            <span className='icon-plus-icon' />
          </Button.Icon>
        </Button>
      </footer>
    </article>
  )
}

export default EmpanadasOrderItem
