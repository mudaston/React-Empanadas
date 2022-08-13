import { FC } from 'react'
import cn from 'classnames'

import LabelBold, { Props as LabelBoldProps } from './LabelBold/LabelBold'
import LabelRegular, { Props as LabelRegularProps } from './LabelRegular/LabelRegular'
import Icon, { Props as IconProps } from './Icon/Icon'
import Counter, { Props as CounterProps } from './Counter/Counter'

import style from '../../../../styles/buttons/Button.module.scss'

type ButtonTypes =
  | 'none'
  | 'choose-filter-button'
  | 'add-item-button'
  | 'empty-basket-button'
  | 'get-back-button-with-icon'
  | 'get-back-button'
  | 'pay-now-button'
  | 'rounded-button-orange'
  | 'rounded-button-grey'

interface OwnProps {
  type?: ButtonTypes
  children: JSX.Element | JSX.Element[]
  onClick?: Function
  isActive?: boolean
}

type Props = OwnProps

type Subcomponents = {
  LabelBold: FC<LabelBoldProps>
  LabelRegular: FC<LabelRegularProps>
  Icon: FC<IconProps>
  Counter: FC<CounterProps>
}

const Button: FC<Props> & Subcomponents = ({ children, onClick, isActive, type }) => {
  return (
    <button
      className={cn(style['base-button'], {
        [style[String(type)]]: type,
        [style[`${type}_active`]]: type && isActive,
      })}
      onClick={() => onClick?.()}
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
