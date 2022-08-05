import { FC, memo, useState } from 'react'
import classNames from 'classnames'

import style from './Dropdown.module.scss'

type alignTypes = 'left' | 'right' | 'center'
type textTransformTypes = 'uppercase' | 'lowercase'
type hoverEffect = true | false

interface DropDownItem {
  id: number
  label: string
}

interface OwnProps {
  items: DropDownItem[]
  callback: (id: number, label: string | null) => void
  activeItem?: string
  align?: alignTypes
  textTransform?: textTransformTypes
  topOffset?: string
  hoverEffect?: hoverEffect
  showDropdown: boolean
}

type Props = OwnProps

const Dropdown: FC<Props> = ({
  items,
  textTransform = 'lowercase',
  callback,
  activeItem,
  align = 'left',
  topOffset = '20px',
  hoverEffect = false,
  showDropdown = false,
}) => {
  const [currentActiveItem, setCurrentActiveItem] = useState(activeItem)

  const HandleOnItemClick = (id: number, label: string) => {
    if (label === currentActiveItem) return

    callback(id, label)

    if (!activeItem) return

    setCurrentActiveItem(label ?? activeItem)
  }

  const setActiveClass = typeof activeItem !== typeof undefined

  return (
    <div
      style={{
        top: topOffset,
        display: showDropdown ? 'block' : 'none',
      }}
      className={classNames(style.dropdown, {
        [style.dropdown_align_left]: align === 'left',
        [style.dropdown_align_right]: align === 'right',
        [style.dropdown_align_center]: align === 'center',
      })}
    >
      <ul className={style.dropdown__list}>
        {items.map(({ id, label }) => (
          <li key={id}>
            <button
              style={{ textTransform }}
              onClick={() => HandleOnItemClick(id, label)}
              className={classNames(style.dropdown__item, {
                [style.dropdown__item_active]: setActiveClass && label === currentActiveItem,
                [style.dropdown__item_hover]: hoverEffect,
              })}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(Dropdown)
