import { FC, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import OutsideClickHandler from 'react-outside-click-handler'
import cn from 'classnames'

import type { LocaleType } from '../../../../interfaces'

import { useGetFiltersQuery } from './sort-service'

import { Dropdown } from '../../../components'

import style from './Sort.module.scss'

interface OwnProps {}

type Props = OwnProps

const Sort: FC<Props> = (props) => {
  const { locale } = useRouter()
  const { data } = useGetFiltersQuery({ locale: locale as LocaleType })
  const { t } = useTranslation(['common'])
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentOption, setCurrentOption] = useState(data?.data[0].label)

  const handleOnShowStateChange = () => {
    setShowDropdown((prevState) => !prevState)
  }

  const handleOnItemChoose = useCallback((id: number, option: string | null) => {
    setCurrentOption(option ?? data?.data[0].label)
    handleOnShowStateChange()
  }, [])

  const memoizedFilters = useMemo(() => data?.data.map(({ id, label }) => ({ id, label })), [])

  return (
    <OutsideClickHandler onOutsideClick={handleOnShowStateChange} disabled={!showDropdown}>
      <div className={style['wrapper']}>
        <div className={style['sort']} onClick={handleOnShowStateChange}>
          <span
            className={cn('icon-chevron_down', style['sort__icon'], {
              [style['sort__icon_active']]: showDropdown,
            })}
          />
          <span className={style['sort__text']}>{t('common:sort_by')}:&nbsp;&nbsp;</span>
          <span className={style['sort__current-option']}>
            {currentOption}
            <Dropdown
              items={memoizedFilters ?? []}
              showDropdown={showDropdown}
              align={'right'}
              textTransform={'lowercase'}
              activeItem={currentOption}
              callback={handleOnItemChoose}
              hoverEffect
              topOffset={'30px'}
            />
          </span>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default Sort
