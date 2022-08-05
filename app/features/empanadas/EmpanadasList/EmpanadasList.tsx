import { FC } from 'react'
import { useRouter } from 'next/router'

import type { LocaleType } from '../../../../interfaces'

import { useGetEmpanadasQuery } from '../empanadas-service'

import EmpanadaItem from '../EmpanadaItem/EmpanadaItem'

import style from './EmpanadasList.module.scss'

interface OwnProps {}

type Props = OwnProps

const EmpanadasList: FC<Props> = () => {
  const { locale } = useRouter()
  const { data } = useGetEmpanadasQuery({ locale: locale as LocaleType })

  return (
    <ul className={style['empanadas-list']}>
      {data?.data.map(({ id, label, image, price_in_dollars }) => (
        <EmpanadaItem key={id} id={id} name={label} image={image} price={price_in_dollars} />
      ))}
    </ul>
  )
}

export default EmpanadasList
