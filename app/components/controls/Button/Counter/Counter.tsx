import { FC } from 'react'
import cl from 'classnames'

import style from './Counter.module.scss'

interface OwnProps {
  children: number
  show?: boolean
}

export type Props = OwnProps

const Counter: FC<Props> = ({ children, show }) => {
  let fontSize = '13px'

  if (children >= 10) fontSize = '11px'
  if (children >= 100) fontSize = '10px'

  return (
    <div
      className={cl(style['counter'], {
        [style['counter_active']]: show,
      })}
      style={{ fontSize }}
    >
      <span className={style['counter__number']}>{children}</span>
    </div>
  )
}

export default Counter
