import { FC } from 'react'

interface OwnProps {
  children: string
}

export type Props = OwnProps

const LabelBold: FC<Props> = ({ children }) => {
  return <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{children}</span>
}

export default LabelBold
