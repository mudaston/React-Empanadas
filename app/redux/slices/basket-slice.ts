import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { IBasketItem } from '../../../interfaces/basket'

interface IEntity extends IBasketItem {
  amount: number
}

interface IInitialState {
  entities: {
    empanadas: IEntity[]
  }
}

const initialState: IInitialState = {
  entities: {
    empanadas: [],
  },
}

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {
    addEmpanada(state, action: PayloadAction<IBasketItem>) {
      const item = state.entities.empanadas.find((item) => item.id === action.payload.id)

      if (item) {
        item.amount++
        return
      }

      state.entities.empanadas.push({
        id: action.payload.id,
        price: action.payload.price,
        amount: 1,
      })
    },
  },
})

export const { addEmpanada } = basketSlice.actions
