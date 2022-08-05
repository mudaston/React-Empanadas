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

  try {
    const { data } = await axiosWorker.get(`${locale}`, {
      params: {
        name: 'filters',
      },
    })

    res.status(200).json({
      data: data[0].filters,
      error: '',
    })
  } catch (error) {
    res.status(404).json({
      data: [],
      error: String(error),
    })
  }
}
