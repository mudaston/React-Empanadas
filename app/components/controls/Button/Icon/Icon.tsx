import { FC } from 'react'

interface OwnProps {
  children: JSX.Element
}

export type Props = OwnProps

const Icon: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default Icon
