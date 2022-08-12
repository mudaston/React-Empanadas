import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import OutsideClickHandler from 'react-outside-click-handler'
import cn from 'classnames'

import type { LocaleType } from '../../../../interfaces'

import { useGetFiltersQuery } from './sort-service'
import { setSortFilter } from '../../../redux/slices/filters-slice'

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
  const [currentValue, setCurrentValue] = useState(data?.data[0].value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSortFilter(currentValue ?? ''))
  }, [currentValue])

  const handleOnItemChoose = useCallback((id: number, option: string | null) => {
    const value = data?.data.find((item) => item.id === id)?.value

    setCurrentOption(option ?? data?.data[0].label)
    setCurrentValue(value)
    setShowDropdown(false)
  }, [])

  const memoizedFilters = useMemo(() => data?.data.map(({ id, label }) => ({ id, label })), [])

  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)} disabled={!showDropdown}>
      <div className={style['wrapper']}>
        <div
          className={style['sort']}
          onClick={() => (!showDropdown ? setShowDropdown(true) : setShowDropdown(false))}
        >
          <span
            className={cn('icon-chevron_down', style['sort__icon'], {
              [style['sort__icon_active']]: showDropdown,
            })}
          />
          <span className={style['sort__text']}>{t('common:sort_by')}:&nbsp;&nbsp;</span>
          <div className={style['sort__current-option']}>
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
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default Sort
