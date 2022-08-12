import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import type { IEmpanadaItem } from '../../interfaces'

import { sortFilters } from '../helpers/sort-filters'
import { sortSelector } from '../redux/selectors/filters'

type ItemsType = IEmpanadaItem

export const useSortItemsBySortFilter = (items: ItemsType[] | undefined) => {
  const sortFilter = useSelector(sortSelector)
  const itemsCopy = [...(items || [])]

  return useMemo(() => {
    switch (sortFilter) {
      case sortFilters.POPULARITY:
        return itemsCopy?.sort((a, b) => {
          if (a.number_of_orders < b.number_of_orders) return 1
          if (a.number_of_orders > b.number_of_orders) return -1
          return 0
        })
      case sortFilters.PRICE:
        return itemsCopy?.sort((a, b) => {
          if (a.price_in_dollars > b.price_in_dollars) return 1
          if (a.price_in_dollars < b.price_in_dollars) return -1
          return 0
        })
      case sortFilters.ALPHABET:
        return itemsCopy?.sort((a, b) => {
          if (a.label > b.label) return 1
          if (a.label < b.label) return -1
          return 0
        })
      default:
        return items
    }
  }, [sortFilter])
}
