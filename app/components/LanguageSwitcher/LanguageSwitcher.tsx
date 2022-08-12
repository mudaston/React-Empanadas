import { FC, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import OutsideClickHandler from 'react-outside-click-handler'

import { Dropdown } from '../index'

import styles from './LanguageSwitcher.module.scss'

interface OwnProps {}

type Props = OwnProps

const LanguageSwitcher: FC<Props> = () => {
  const { pathname, asPath, query, locales, locale, push, defaultLocale } = useRouter()
  const [active, setActive] = useState(false)

  const handleOnItemChoose = async (id: number, item: string | null) => {
    const chosenLocale = item ?? defaultLocale

    handleOnShowStateChange()

    await push({ pathname, query }, asPath, { locale: chosenLocale })
  }

  const handleOnShowStateChange = () => {
    setActive((prevState) => !prevState)
  }

  const availableLocales = useMemo(
    () => locales?.filter((lang) => lang !== locale).map((label, i) => ({ id: i, label })) ?? [],
    [locale]
  )

  return (
    <OutsideClickHandler onOutsideClick={handleOnShowStateChange} disabled={!active}>
      <div className={styles.switcher}>
        <button onClick={handleOnShowStateChange} className={styles.switcher__current_language}>
          {locale}
        </button>
        <Dropdown
          items={availableLocales}
          showDropdown={active}
          align={'center'}
          textTransform={'uppercase'}
          callback={handleOnItemChoose}
          hoverEffect
          topOffset={'30px'}
        />
      </div>
    </OutsideClickHandler>
  )
}

export default LanguageSwitcher
