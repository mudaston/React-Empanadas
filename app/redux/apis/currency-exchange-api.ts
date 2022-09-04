import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import type { ICurrencyExchangeResponse } from '../../../interfaces/ICurrencyExchange'

import { apiPaths } from '../../helpers/api-paths'

export const currencyExchangeApi = createApi({
  reducerPath: 'currencyExchangeApi',
  keepUnusedDataFor: 3600,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
  endpoints: (build) => ({
    getExchangeRate: build.query<ICurrencyExchangeResponse, void>({
      query: () => ({
        url: `/${apiPaths.currencyExchange}`,
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
      }),
    }),
  }),
})

export const {
  useGetExchangeRateQuery,
  endpoints: { getExchangeRate },
  util: { getRunningOperationPromises },
} = currencyExchangeApi
