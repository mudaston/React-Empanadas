import { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { routerPaths } from '../../helpers/router-paths'
import { LanguageSwitcher, OrderStatus } from '../index'

import style from './Header.module.scss'

import logo from '../../assets/img/logo.png'

interface OwnProps {
  subtitle: string
}

type Props = OwnProps

const Header: FC<Props> = ({ subtitle }) => {
  const { t } = useTranslation(['common', 'home'])
  const { route } = useRouter()

  const ShowOrderStatus = route !== routerPaths.order && <OrderStatus />

  return (
    <header className={`${style['header']} container`}>
      <div className={style['header__left-side']}>
        <div className={style['header__logo']}>
          <Image src={logo} alt={t('common:cafe_name')} placeholder='blur' />
        </div>
        <div className={style['header__text']}>
          <span className={style['header__cafe-name']}>{t('common:cafe_name')}</span>
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
