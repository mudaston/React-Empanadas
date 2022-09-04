import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { axiosWorker } from '../../../services/axios-worker'

import { IGetCategoriesResponse } from '../../../interfaces'

const cors = Cors({
  methods: ['GET'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<IGetCategoriesResponse>,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result)

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetCategoriesResponse>
) {
  await runMiddleware(req, res, cors)

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
