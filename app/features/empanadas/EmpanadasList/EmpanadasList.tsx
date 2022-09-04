import { FC } from 'react'

import { useGetFilteredEmpanadas } from '../../../hooks/useGetFilteredEmpanadas'

import EmpanadaItem from '../EmpanadaItem/EmpanadaItem'

import style from './EmpanadasList.module.scss'

interface OwnProps {}

type Props = OwnProps

const EmpanadasList: FC<Props> = () => {
  const empanadas = useGetFilteredEmpanadas()

  return (
    <ul className={style['empanadas-list']}>
      {empanadas?.map(({ id, label, image, price_in_dollars }) => (
        <li key={id}>
          <EmpanadaItem id={id} name={label} image={image} price={price_in_dollars} />
        </li>
      ))}
    </ul>
  )
}

export default EmpanadasList
