import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { routerPaths } from '../../helpers/router-paths'

import { Button } from '../controls'

import style from './BasketIsEmpty.module.scss'
import image from '../../assets/img/basket-is-empty.svg'

interface OwnProps {}

type Props = OwnProps

const BasketIsEmpty: FC<Props> = () => {
  const router = useRouter()

  return (
    <article className={style['basket-empty']}>
      <header className={style['basket-empty__header']}>
        <span className={style['basket-empty__title']}>Корзина пустая 😕</span>
        <p className={style['basket-empty__subtitle']}>
          Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на
          главную страницу.
        </p>
      </header>
      <main className={style['basket-empty__image']}>
        {<Image src={image} alt={''} width={430} height={366} />}
      </main>
      <footer className={style['basket-empty__footer']}>
        <Button type={'get-back-button'} onClick={() => router.push(routerPaths.home)}>
          <Button.LabelBold>Вернуться назад</Button.LabelBold>
        </Button>
      </footer>
    </article>
  )
}

export default BasketIsEmpty
