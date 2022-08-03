import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { routerPaths } from '../../helpers/router-paths'
import { LanguageSwitcher, OrderStatus } from '../index'

import style from './Header.module.scss'

import logo from '../../assets/img/logo.png'

interface OwnProps {}

type Props = OwnProps

const Header: FC<Props> = () => {
  const { t } = useTranslation(['header', 'basket-header', 'currencies'])
  const { route } = useRouter()

  const ShowOrderStatus = route !== routerPaths.order && <OrderStatus />
  const subtitle =
    route === routerPaths.order ? t('basket-header:subheader') : t('header:subheader')

  return (
    <header className={`${style['header']} container`}>
      <div className={style['header__left-side']}>
        <div className={style['header__logo']}>
          <Link href={routerPaths.home}>
            <a>
              <Image src={logo} alt={t('header:cafe_name')} placeholder='blur' />
            </a>
          </Link>
        </div>
        <div className={style['header__text']}>
          <span className={style['header__cafe-name']}>{t('header:cafe_name')}</span>
          <span className={style['header__subtitle']}>{subtitle}</span>
        </div>
      </div>
      <div className={style['header__right-side']}>
        <LanguageSwitcher />
        {ShowOrderStatus}
      </div>
    </header>
  )
}

export default Header
