import React, { FC } from 'react'
import cn from 'classnames'

import LabelBold, { Props as LabelBoldProps } from './LabelBold/LabelBold'
import LabelRegular, { Props as LabelRegularProps } from './LabelRegular/LabelRegular'
import Icon, { Props as IconProps } from './Icon/Icon'
import Counter, { Props as CounterProps } from './Counter/Counter'

import style from '../../../../styles/buttons/Button.module.scss'

interface OwnProps {
  type?: ButtonTypes
  children: JSX.Element | JSX.Element[]
  onClick?: Function
  isActive?: boolean
  ariaLabel?: string
}

type Props = OwnProps

const Button: FC<Props> & Subcomponents = ({ children, onClick, isActive, type, ariaLabel }) => {
  return (
    <button
      className={cn(style['base-button'], {
        [style[String(type)]]: type,
        [style[`${type}_active`]]: type && isActive,
      })}
      onClick={() => onClick?.()}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

Button.LabelBold = LabelBold
Button.LabelRegular = LabelRegular
Button.Icon = Icon
Button.Counter = Counter

export default Button
