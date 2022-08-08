import { FC } from 'react'

import style from './Counter.module.scss'

interface OwnProps {
  children: number
}

export type Props = OwnProps

const Counter: FC<Props> = ({ children }) => {
  let fontSize = '13px'

  if (children >= 10) fontSize = '11px'
  if (children >= 100) fontSize = '10px'

  return (
    <div className={style['counter']} style={{ fontSize }}>
      <span className={style['counter__number']}>{children}</span>
    </div>
  )
}

export default Counter
