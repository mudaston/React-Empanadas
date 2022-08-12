import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const filters = (state: RootState) => state.filtersSlice

export const categorySelector = createSelector(filters, (state) => state.categoryFilter)

export const sortSelector = createSelector(filters, (state) => state.sortFilter)
