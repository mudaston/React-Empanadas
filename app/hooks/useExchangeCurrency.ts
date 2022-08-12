import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { availableLocales } from '../helpers/available-locales'
import { useGetExchangeRateQuery } from '../redux/apis/currency-exchange-api'

const RoundNumber = (first: number, second: number) => Math.ceil(first * second)

export const useExchangeCurrency = () => {
  const { locale } = useRouter()
  const { data } = useGetExchangeRateQuery()

  const exchangeCurrency = useCallback((USD: number) => {
    switch (locale) {
      case availableLocales.UK:
        return RoundNumber(USD, data?.data.UAH ?? 0)
      case availableLocales.RU:
        return RoundNumber(USD, data?.data.RUB ?? 0)
    }

    return USD.toFixed(2)
  }, [])

  return {
    exchangeCurrency,
  }
}
