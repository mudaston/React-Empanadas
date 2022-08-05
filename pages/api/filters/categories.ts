import type { NextApiRequest, NextApiResponse } from 'next'
import { axiosWorker } from '../../../services/axios-worker'

import { IGetCategoriesResponse } from '../../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetCategoriesResponse>
) {
  const {
    query: { locale },
  } = req

  try {
    const { data } = await axiosWorker.get(`${locale}`, {
      params: {
        name: 'categories',
      },
    })

    res.status(200).json({
      data: data[0].filters,
      error: '',
    })
  } catch (e) {
    res.status(404).json({
      data: [],
      error: String(e),
    })
  }
}
