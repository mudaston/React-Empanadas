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
        [style['choose-filter-button']]: type === 'choose-filter-button',
        [style['choose-filter-button_active']]: type === 'choose-filter-button' && isActive,
        [style['add-item-button']]: type === 'add-item-button',
        [style['add-item-button_active']]: type === 'add-item-button' && isActive,
        [style['empty-basket-button']]: type === 'empty-basket-button',
        [style['empty-basket-button_active']]: type === 'empty-basket-button' && isActive,
        [style['get-back-button-with-icon']]: type === 'get-back-button-with-icon',
        [style['get-back-button-with-icon_active']]:
          type === 'get-back-button-with-icon' && isActive,
        [style['pay-now-button']]: type === 'pay-now-button',
        [style['pay-now-button_active']]: type === 'pay-now-button' && isActive,
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
