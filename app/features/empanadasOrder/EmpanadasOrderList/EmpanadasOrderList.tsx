import { FC } from 'react'

import EmpanadasOrderItem from '../EmpanadasOrderItem/EmpanadasOrderItem'

import style from './EmpanadasOrderList.module.scss'

interface OwnProps {}

type Props = OwnProps

const EmpanadasOrderList: FC<Props> = () => {
  return (
    <ul className={style['empanadas-order-list']}>
      <li className={style['empanadas-order-list__li']}>
        <EmpanadasOrderItem />
      </li>
      <li className={style['empanadas-order-list__li']}>
        <EmpanadasOrderItem />
      </li>
      <li className={style['empanadas-order-list__li']}>
        <EmpanadasOrderItem />
      </li>
    </ul>
  )
}

export default EmpanadasOrderList
