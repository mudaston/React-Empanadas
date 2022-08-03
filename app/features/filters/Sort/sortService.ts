import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { apiPaths } from '../../../helpers/api-paths'
import { IGetFiltersResponse } from '../../../../interfaces'

export type LocaleType = 'ru' | 'uk' | 'en' | string

interface IGetFilters {
  locale: LocaleType
}

export const filtersApi = createApi({
  reducerPath: 'testApi',
  keepUnusedDataFor: 3600,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getFilters: builder.query<string[], IGetFilters>({
      query: ({ locale }: IGetFilters) => ({
        url: `/${apiPaths.getSortFilters}`,
        params: {
          locale,
        },
      }),
      transformResponse(response: IGetFiltersResponse) {
        return response.data
      },
    }),
  }),
})

export const {
  useGetFiltersQuery,
  util: { getRunningOperationPromises },
} = filtersApi
export const { getFilters } = filtersApi.endpoints
