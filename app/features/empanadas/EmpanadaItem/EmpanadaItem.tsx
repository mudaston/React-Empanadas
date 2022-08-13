import { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Button } from '../../../components/controls'

import style from './EmpanadaItem.module.scss'

interface OwnProps {
  id: number
  name: string
  price: number
  image: string
}

type Props = OwnProps

const EmpanadaItem: FC<Props> = ({ id, name, price, image }) => {
  const { t } = useTranslation(['currencies', 'home'])

  return (
    <article className={style['empanada-item']}>
      <div className={style['empanada-item__img']}>
        <Image src={image} layout={'fill'} loading={'lazy'} alt={name} />
      </div>
      <div className={style['empanada-item__info-wrapper']}>
        <span className={style['empanada-item__name']}>{name}</span>
        <footer className={style['empanada-item__info']}>
          <span className={style['empanada-item__price']}>
            от {price} {t('currencies:currency')}
          </span>
          <Button type={'add-item-button'}>
            <Button.Icon fontSize='12px'>
              <span className='icon-plus-icon' />
            </Button.Icon>
            <Button.LabelBold>{t('home:add')}</Button.LabelBold>
            {/*<Button.Counter>{3}</Button.Counter>*/}
          </Button>
        </footer>
      </div>
    </article>
  )
}

export default EmpanadaItem
