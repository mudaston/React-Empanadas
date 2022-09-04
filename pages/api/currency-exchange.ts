import axios from 'axios'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ICurrencyExchangeResponse,
  ICurrencyExchangeServerResponse,
} from '../../interfaces/ICurrencyExchange'

const cors = Cors({
  methods: ['GET'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<ICurrencyExchangeResponse>,
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
  res: NextApiResponse<ICurrencyExchangeResponse>
) {
  await runMiddleware(req, res, cors)

  try {
    const { data } = await axios.get<ICurrencyExchangeServerResponse>(
      'https://v6.exchangerate-api.com/v6/26c993debdc06d68aa5521c1/latest/USD'
    )

    res.status(200).json({
      data: {
        UAH: data.conversion_rates.UAH,
        RUB: data.conversion_rates.RUB,
      },
      error: '',
    })
  } catch (error) {
    res.status(404).json({
      data: {},
      error: String(error),
    })
  }
}
