import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryFilter: '',
  sortFilter: '',
}

export const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload
    },
    setSortFilter(state, action: PayloadAction<string>) {
      state.sortFilter = action.payload
    },
  },
})

export const {
  actions: { setCategoryFilter, setSortFilter },
} = filtersSlice
