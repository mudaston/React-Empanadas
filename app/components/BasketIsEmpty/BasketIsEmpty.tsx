import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { routerPaths } from '../../helpers/router-paths'

import { Button } from '../controls'

import style from './BasketIsEmpty.module.scss'
import image from '../../assets/img/basket-is-empty.svg'

interface OwnProps {}

type Props = OwnProps

const BasketIsEmpty: FC<Props> = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'basket'])

  return (
    <article className={style['basket-empty']}>
      <header className={style['basket-empty__header']}>
        <span className={style['basket-empty__title']}>{t('basket:cart_is_empty')} 😕</span>
        <p className={style['basket-empty__subtitle']}>{t('basket:order_now')}</p>
      </header>
      <div className={style['basket-empty__image']}>
        {<Image src={image} alt={''} width={430} height={366} />}
      </div>
      <footer className={style['basket-empty__footer']}>
        <Button type={'get-back-button'} onClick={() => router.push(routerPaths.home)}>
          <Button.LabelBold>{t('common:come_back')}</Button.LabelBold>
        </Button>
      </footer>
    </article>
  )
}

export default BasketIsEmpty
