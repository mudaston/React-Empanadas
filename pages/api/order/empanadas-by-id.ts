import type { NextApiRequest, NextApiResponse } from 'next'
import { axiosWorker } from '../../../services/axios-worker'
import Cors from 'cors'

import { IEmpanadaItem, IIEmpanadaItemsByIDResponse } from '../../../interfaces'

const cors = Cors({
  methods: ['GET'],
  origin: '*',
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<IIEmpanadaItemsByIDResponse>,
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
  res: NextApiResponse<IIEmpanadaItemsByIDResponse>
) {
  await runMiddleware(req, res, cors)

  const {
    query: { locale, ids },
  } = req

  try {
    const { data } = await axiosWorker.get(`${locale}`, {
      params: {
        name: 'empanadas',
      },
    })

    const filteredItems = data[0].empanadas.filter(({ id }: IEmpanadaItem) =>
      ids?.includes(String(id))
    )

    res.status(200).json({
      data: filteredItems,
      error: '',
    })
  } catch (error) {
    res.status(404).json({
      data: [],
      error: String(error),
    })
  }
}
