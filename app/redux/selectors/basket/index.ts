// @ts-nocheck
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

const basketEntities = (state: RootState) => state.basketSlice.entities

const basketEmpanadasEntities = (state: RootState) =>
  state.basketSlice.entities.empanadas.basketItems

const orderEmpanadasEntities = (state: RootState) => state.basketSlice.entities.empanadas.orderItems

export const basketItemsAmount = createSelector(basketEntities, (items) =>
  Object.keys(items).reduce((previous, key) => previous + items[key].basketItems.length, 0)
)

export const empanadasAmount = createSelector(basketEmpanadasEntities, (items) =>
  items.reduce((acc, currentValue) => acc + currentValue.amount, 0)
)

export const empanadasOrderItems = createSelector(orderEmpanadasEntities, (items) => items)
export const empanadasBasketItems = createSelector(basketEmpanadasEntities, (items) => items)

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

export const empanadaCostByID = (id: number) =>
  createSelector(basketEmpanadasEntities, (items) => {
    const empanada = items.find((item) => item.id === id)

    return empanada?.amount * empanada?.price
  })
