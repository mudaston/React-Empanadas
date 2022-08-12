import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

const basketEntities = (state: RootState) => state.basketSlice.entities

const basketEmpanadasEntities = (state: RootState) => state.basketSlice.entities.empanadas

export const basketItemsAmount = createSelector(basketEntities, (items) =>
  // @ts-ignore
  Object.keys(items).reduce((previous, key) => previous + items[key].length, 0)
)

// get the sum of all items in the basketSlice by reducing every object item
export const basketOrderSum = createSelector(basketEntities, (items) =>
  Object.keys(items).reduce(
    (previous, key) =>
      previous +
      // @ts-ignore
      items[key].reduce((accumulator, item) => accumulator + item.price * item.amount, 0),
    0
  )
)

export const empanadaAmountByID = (id: number) =>
  createSelector(basketEmpanadasEntities, (items) => items.find((item) => item.id === id)?.amount)
