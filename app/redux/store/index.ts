import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { filtersApi } from '../../features/filters/Sort/sortService'

export const makeStore = () =>
  configureStore({
    reducer: {
      [filtersApi.reducerPath]: filtersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filtersApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
