import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { fetchEmpanadas } from '../../../redux/slices/basket-slice'
import { empanadasBasketItems, empanadasOrderItems } from '../../../redux/selectors/basket'

import EmpanadasOrderItem from '../EmpanadasOrderItem/EmpanadasOrderItem'

import style from './EmpanadasOrderList.module.scss'

interface OwnProps {}

type Props = OwnProps

const EmpanadasOrderList: FC<Props> = () => {
  const empanadasOrder = useSelector(empanadasOrderItems)
  const empanadasBasket = useSelector(empanadasBasketItems)
  const { locale, defaultLocale } = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ids = empanadasBasket.map(({ id }) => id)

    fetchEmpanadasAsync(ids)
  }, [])

  const fetchEmpanadasAsync = async (ids: number[]) => {
    await dispatch(fetchEmpanadas({ ids, locale: locale || defaultLocale || 'uk' }))
  }

  return (
    <ul className={style['empanadas-order-list']}>
      {empanadasOrder.map(({ id, label, image }) => (
        <li key={id} className={style['empanadas-order-list__li']}>
          <EmpanadasOrderItem id={id} name={label} image={image} />
        </li>
      ))}
    </ul>
  )
}

export default EmpanadasOrderList
