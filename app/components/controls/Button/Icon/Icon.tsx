import { FC } from 'react'

import style from './Icon.module.scss'

interface OwnProps {
  children: JSX.Element
  fontSize?: string
}

export type Props = OwnProps

const Icon: FC<Props> = ({ children, fontSize = '1rem' }) => {
  return (
    <span className={style['icon']} style={{ fontSize }}>
      {children}
    </span>
  )
}

export default Icon
