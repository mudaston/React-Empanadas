import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { apiPaths } from '../../helpers/api-paths'
import type { IItemsByIdsResponse, LocaleType } from '../../../interfaces'

interface IGetQuery {
  locale: LocaleType
}

interface IGetItemsByIDs extends IGetQuery {
  ids: number[]
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  keepUnusedDataFor: 3600,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
  endpoints: (build) => ({
    getItemsByIDs: build.query<IItemsByIdsResponse, IGetItemsByIDs>({
      query: ({ locale, ids }: IGetItemsByIDs) => ({
        url: `/${apiPaths.getItemsByIds}`,
        params: {
          locale,
          ids,
        },
      }),
    }),
  }),
})

export const {
  useGetItemsByIDsQuery,
  endpoints: { getItemsByIDs },
  util: { getRunningOperationPromises },
} = orderApi
