import type { NextApiRequest, NextApiResponse } from 'next'
import { axiosWorker } from '../../../services/axios-worker'

import { IGetFiltersResponse } from '../../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetFiltersResponse>
) {
  const {
    query: { locale },
  } = req

  console.log(locale)

  const { data } = await axiosWorker.get(`${locale}`, {
    params: {
      name: 'filters',
    },
  })

  if (!data)
    res.status(404).json({
      data: [
        'An error occurred while requesting data.' +
          '\nResult object is empty' +
          '\nPerhaps the locale parameter is incorrect',
      ],
    })

  res.status(200).json({
    data: [...data[0].filters],
  })
}
