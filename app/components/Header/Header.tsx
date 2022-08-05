import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
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
  const [mobileMenuActive, setMobileMenuActive] = useState(false)

  useEffect(() => {
    if (mobileMenuActive) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [mobileMenuActive])

  const handleChangeMenuVisible = () => {
    setMobileMenuActive((prevState) => !prevState)
  }

  const ShowOrderStatus = route !== routerPaths.order && <OrderStatus />
  const subtitle =
    route === routerPaths.order ? t('basket-header:subheader') : t('header:subheader')

  return (
    <header className={style['header']}>
      <div className={style['header-mobile']}>
        <div className={style['header-mobile__logo']}>
          <Link href={routerPaths.home}>
            <a>
              <Image src={logo} alt={t('header:cafe_name')} placeholder='blur' />
            </a>
          </Link>
        </div>
        <div
          className={classNames(style['header-mobile__burger'], {
            [style['header-mobile__burger_active']]: mobileMenuActive,
          })}
          onClick={handleChangeMenuVisible}
        >
          <span
            className={`${style['header-mobile__burger-line']} ${style['header-mobile__burger-line_first']}`}
          />
          <span
            className={`${style['header-mobile__burger-line']} ${style['header-mobile__burger-line_second']}`}
          />
          <span
            className={`${style['header-mobile__burger-line']} ${style['header-mobile__burger-line_third']}`}
          />
        </div>
      </div>
      <div
        className={classNames('container', style['header__wrapper'], {
          [style['header__wrapper_active']]: mobileMenuActive,
        })}
      >
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
      </div>
    </header>
  )
}

export default Header
