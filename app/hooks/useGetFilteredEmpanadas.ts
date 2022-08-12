import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import type { LocaleType } from '../../interfaces'

import { categorySelector } from '../redux/selectors/filters'
import { useGetEmpanadasQuery } from '../features/empanadas/empanadas-service'
import { categoryFilters } from '../helpers/category-filters'
import { useSortItemsBySortFilter } from './useSortItemsBySortFilter'

export const useGetFilteredEmpanadas = () => {
  const { locale } = useRouter()
  const { data } = useGetEmpanadasQuery({ locale: locale as LocaleType })
  const categoryFilter = useSelector(categorySelector)
  const sortedBySortFilter = useSortItemsBySortFilter(data?.data)

  return useMemo(() => {
    if (categoryFilter === categoryFilters.ALL) return sortedBySortFilter

    return sortedBySortFilter?.filter(({ types }) => types.includes(categoryFilter))
  }, [categoryFilter, sortedBySortFilter])
}
