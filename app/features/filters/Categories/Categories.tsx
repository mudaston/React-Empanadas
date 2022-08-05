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
  const { data } = useGetCategoriesQuery({ locale: locale as LocaleType })
  const [currentCategory, setCurrentCategory] = useState(data?.data[0].label)

  const chooseCategoryHandler = (label: string, value: string) => {
    if (label === currentCategory) return

    setCurrentCategory(label)
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
