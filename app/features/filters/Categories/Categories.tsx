import { FC, useState } from 'react'
import { useRouter } from 'next/router'

import type { LocaleType } from '../../../../interfaces'

import { useGetCategoriesQuery } from './categories-service'

import { Button } from '../../../components/controls'

import style from './Categories.module.scss'

interface OwnProps {}

type Props = OwnProps

const Categories: FC<Props> = (props) => {
  const { locale } = useRouter()
  const { data: categories } = useGetCategoriesQuery({ locale: locale as LocaleType })
  const [currentCategory, setCurrentCategory] = useState(categories?.[0])

  const chooseCategoryHandler = (category: string) => {
    if (category === currentCategory) return

    setCurrentCategory(category)
  }

  return (
    <ul className={style['categories']}>
      {categories?.map((category) => (
        <li key={category} className={style['categories__item']}>
          <Button
            type={'choose-filter-button'}
            isActive={category === currentCategory}
            onClick={() => chooseCategoryHandler(category)}
          >
            <Button.LabelBold>{category}</Button.LabelBold>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Categories
