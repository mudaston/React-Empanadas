import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { apiPaths } from '../../../helpers/api-paths'
import { IGetCategoriesResponse, LocaleType } from '../../../../interfaces'

interface IGetCategories {
  locale: LocaleType
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  keepUnusedDataFor: 3600,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getCategories: builder.query<string[], IGetCategories>({
      query: ({ locale }: IGetCategories) => ({
        url: `/${apiPaths.getCategoriesFilters}`,
        params: {
          locale,
        },
      }),
      transformResponse(response: IGetCategoriesResponse) {
        return response.data
      },
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  util: { getRunningOperationPromises },
} = categoriesApi
export const { getCategories } = categoriesApi.endpoints
