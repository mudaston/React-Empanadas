import { FC, useEffect, useState, useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import type { LocaleType } from '../../../../interfaces'

import { useGetCategoriesQuery } from './categories-service'
import { setCategoryFilter } from '../../../redux/slices/filters-slice'
import { categoryFilters } from '../../../helpers/category-filters'

import { Button } from '../../../components/controls'

import style from './Categories.module.scss'

interface OwnProps {}

type Props = OwnProps

const Categories: FC<Props> = (props) => {
  const { locale } = useRouter()
  const { data } = useGetCategoriesQuery({ locale: locale as LocaleType })
  const [currentCategory, setCurrentCategory] = useState(data?.data[0].label)
  const [currentValue, setCurrentValue] = useState(data?.data[0].value)
  const [, startTransition] = useTransition()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCategoryFilter(currentValue ?? categoryFilters.ALL))
  }, [currentValue])

  const chooseCategoryHandler = (label: string, value: string) => {
    if (label === currentCategory) return

    startTransition(() => {
      setCurrentCategory(label)
      setCurrentValue(value)
    })
  }

  return (
    <ul className={style['categories']}>
      {data?.data.map(({ id, label, value }) => (
        <li key={id} className={style['categories__item']}>
          <Button
            type={'choose-filter-button'}
            isActive={label === currentCategory}
            onClick={() => chooseCategoryHandler(label, value)}
          >
            <Button.LabelBold>{label}</Button.LabelBold>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Categories
