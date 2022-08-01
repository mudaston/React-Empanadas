import type { AppProps } from 'next/app'
import { wrapper } from '../app/redux/store'
import { appWithTranslation } from 'next-i18next'

import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(appWithTranslation(MyApp))
