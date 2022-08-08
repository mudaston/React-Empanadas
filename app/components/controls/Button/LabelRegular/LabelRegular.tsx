import { FC } from 'react'

interface OwnProps {
  children: string
}

export type Props = OwnProps

const LabelRegular: FC<Props> = ({ children }) => {
  return <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>{children}</span>
}

export default LabelRegular
