import { Children, FC, memo, MouseEvent, useState } from 'react'

import classNames from 'classnames'

import style from './Dropdown.module.scss'

type alignTypes = 'left' | 'right' | 'center'
type textTransformTypes = 'uppercase' | 'lowercase'
type hoverEffect = true | false

interface OwnProps {
  children: JSX.Element[] | JSX.Element | string[] | string
  callback: (item: string | null) => void
  activeItem?: string
  align?: alignTypes
  textTransform?: textTransformTypes
  topOffset?: string
  hoverEffect?: hoverEffect
}

type Props = OwnProps

const Dropdown: FC<Props> = ({
  children,
  textTransform = 'lowercase',
  callback,
  activeItem,
  align = 'left',
  topOffset = '20px',
  hoverEffect = false,
}) => {
  const [currentActiveItem, setCurrentActiveItem] = useState(activeItem)

  const HandleOnItemClick = (item: MouseEvent<HTMLButtonElement>) => {
    const textContent = item.currentTarget.textContent

    if (textContent === currentActiveItem) return

    callback(textContent)

    if (!activeItem) return

    setCurrentActiveItem(textContent ?? activeItem)
  }

  const setActiveClass = typeof activeItem !== typeof undefined

  return (
    <div
      style={{
        top: topOffset,
      }}
      className={classNames(style.dropdown, {
        [style.dropdown_align_left]: align === 'left',
        [style.dropdown_align_right]: align === 'right',
        [style.dropdown_align_center]: align === 'center',
      })}
    >
      <ul className={style.dropdown__list}>
        {Children.map(children, (child) => (
          <li key={1}>
            <button
              style={{ textTransform }}
              onClick={HandleOnItemClick}
              className={classNames(style.dropdown__item, {
                [style.dropdown__item_active]: setActiveClass && child === currentActiveItem,
                [style.dropdown__item_hover]: hoverEffect,
              })}
            >
              {child}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(Dropdown)
