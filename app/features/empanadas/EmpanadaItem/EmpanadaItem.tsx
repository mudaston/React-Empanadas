import { FC } from 'react'
import Image from 'next/image'

interface OwnProps {
  id: number
  name: string
  price: number
  image: string
}

type Props = OwnProps

const EmpanadaItem: FC<Props> = ({ id, name, price, image }) => {
  return (
    <div>
      <Image
        src={image}
        blurDataURL={image}
        width={200}
        height={200}
        placeholder={'blur'}
        alt={name}
      />
    </div>
  )
}

export default EmpanadaItem
