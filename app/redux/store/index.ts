import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { filtersApi } from '../../features/filters/Sort/sort-service'
import { categoriesApi } from '../../features/filters/Categories/categories-service'

export const makeStore = () =>
  configureStore({
    reducer: {
      [filtersApi.reducerPath]: filtersApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filtersApi.middleware, categoriesApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
