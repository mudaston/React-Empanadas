import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { sortApi } from '../../features/filters/Sort/sort-service'
import { categoriesApi } from '../../features/filters/Categories/categories-service'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sortApi.reducerPath]: sortApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sortApi.middleware, categoriesApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
