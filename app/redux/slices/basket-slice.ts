import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

import type { IBasketItem } from '../../../interfaces/basket'
import type { IEmpanadaItem } from '../../../interfaces'
import { LocaleType } from '../../../interfaces'

import { apiPaths } from '../../helpers/api-paths'

interface IGetQuery {
  locale: LocaleType
}

interface IGetEmpanadasByID extends IGetQuery {
  ids: number[]
}

export const fetchEmpanadas = createAsyncThunk(
  'basketSlice/fetchEmpanadas',
  async ({ locale, ids }: IGetEmpanadasByID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/${apiPaths.getEmpanadasByID}`, {
        params: {
          locale,
          ids: JSON.stringify(ids),
        },
      })

      if (response.status !== 200) throw new Error('Server side error')

      return response.data
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message)
    }
  }
)

interface IEntity extends IBasketItem {
  amount: number
}

interface IInitialState {
  entities: {
    empanadas: {
      basketItems: IEntity[]
      orderItems: IEmpanadaItem[]
    }
  }
  isPending: boolean
  isError: boolean
  isSuccess: boolean
  error: string
}

const initialState: IInitialState = {
  entities: {
    empanadas: {
      basketItems: [],
      orderItems: [],
    },
  },
  isPending: false,
  isError: false,
  isSuccess: false,
  error: '',
}

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {
    addEmpanada(state, action: PayloadAction<IBasketItem>) {
      const item = state.entities.empanadas.basketItems.find(
        (item) => item.id === action.payload.id
      )

      if (item) {
        item.amount++
        return
      }

      state.entities.empanadas.basketItems.push({
        id: action.payload.id,
        price: action.payload.price,
        amount: 1,
      })
    },
    deleteEmpanadaByID(state, action: PayloadAction<number>) {
      state.entities.empanadas.basketItems = state.entities.empanadas.basketItems.filter(
        ({ id }) => id !== action.payload
      )
      state.entities.empanadas.orderItems = state.entities.empanadas.orderItems.filter(
        ({ id }) => id !== action.payload
      )
    },
    emptyBasket(state) {
      // @ts-ignore
      Object.keys(state.entities).forEach((entityKey) =>
        // @ts-ignore
        Object.keys(state.entities[entityKey]).forEach(
          (key) =>
            // @ts-ignore
            (state.entities[entityKey][key] = [])
        )
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        ...action.payload[basketSlice.name],
        entities: {
          empanadas: {
            // @ts-ignore
            ...action.payload[basketSlice.name].entities.empanadas,
            basketItems: state.entities.empanadas.basketItems,
          },
        },
      }
    })
    builder.addCase(fetchEmpanadas.pending, (state) => {
      state.isPending = true
      state.error = ''
      state.isError = false
      state.isSuccess = false
    })
    builder.addCase(fetchEmpanadas.fulfilled, (state, action) => {
      state.entities.empanadas.orderItems = action.payload.data
      state.isPending = false
      state.error = ''
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(fetchEmpanadas.rejected, (state, action) => {
      state.isPending = false
      // @ts-ignore
      state.error = action.payload
      state.isError = true
      state.isSuccess = false
    })
  },
})

export const { addEmpanada, emptyBasket, deleteEmpanadaByID } = basketSlice.actions
