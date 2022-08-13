// @ts-nocheck
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

const basketEntities = (state: RootState) => state.basketSlice.entities

const basketEmpanadasEntities = (state: RootState) =>
  state.basketSlice.entities.empanadas.basketItems

export const basketItemsAmount = createSelector(basketEntities, (items) =>
  Object.keys(items).reduce((previous, key) => previous + items[key].basketItems.length, 0)
)

// get the sum of all items in the basketSlice by reducing every object item
export const basketOrderSum = createSelector(basketEntities, (items) =>
  Object.keys(items).reduce(
    (previous, key) =>
      previous +
      items[key].basketItems.reduce(
        (accumulator, item) => accumulator + item.price * item.amount,
        0
      ),
    0
  )
)

export const empanadaAmountByID = (id: number) =>
  createSelector(basketEmpanadasEntities, (items) => items.find((item) => item.id === id)?.amount)
