import type { NextApiRequest, NextApiResponse } from 'next'
import { axiosWorker } from '../../services/axios-worker'

import { IEmpanadasResponse } from '../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEmpanadasResponse>
) {
  const {
    query: { locale },
  } = req

  axiosWorker
    .get(`${locale}`, {
      params: {
        name: 'empanadas',
      },
    })
    .then(({ data }) => {
      res.status(200).json({
        data: data[0].empanadas,
        error: '',
      })
    })
    .catch((error) => {
      res.status(500).json({
        data: [],
        error: error,
      })
    })
}
