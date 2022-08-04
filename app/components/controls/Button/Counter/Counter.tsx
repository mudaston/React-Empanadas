import { FC } from 'react'

import style from './Counter.module.scss'

interface OwnProps {
  children: string
}

export type Props = OwnProps

const Counter: FC<Props> = ({ children }) => {
  return (
    <div className={style['counter']}>
      <span className={style['counter__number']}>{children}</span>
    </div>
  )
}

export default Counter
