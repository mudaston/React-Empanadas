import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { apiPaths } from '../../helpers/api-paths'
import { IEmpanadasResponse, LocaleType } from '../../../interfaces'

interface IGetEmpanadas {
  locale: LocaleType
}

export const empanadasApi = createApi({
  reducerPath: 'empanadasApi',
  keepUnusedDataFor: 3600,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getEmpanadas: builder.query<IEmpanadasResponse, IGetEmpanadas>({
      query: ({ locale }: IGetEmpanadas) => ({
        url: `/${apiPaths.getEmpanadas}`,
        params: {
          locale,
        },
        mode: 'no-cors',
      }),
    }),
  }),
})

export const {
  useGetEmpanadasQuery,
  util: { getRunningOperationPromises },
} = empanadasApi
export const { getEmpanadas } = empanadasApi.endpoints
