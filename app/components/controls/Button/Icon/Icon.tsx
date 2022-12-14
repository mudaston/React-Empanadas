import { FC } from 'react'

import style from './Icon.module.scss'

type IconTypes = 'weightless'

interface OwnProps {
  children: JSX.Element
  fontSize?: string
  type?: IconTypes
  transform?: string
}

export type Props = OwnProps

const Icon: FC<Props> = ({ children, fontSize = '1rem', type, transform }) => {
  return (
    <div
      className={style['icon']}
      style={{
        fontSize,
        width: type === 'weightless' ? '' : fontSize,
        transform,
      }}
    >
      <div className={style['icon__children']}>{children}</div>
    </div>
  )
}

export default Icon
