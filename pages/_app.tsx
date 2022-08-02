import type { AppProps } from 'next/app'
import { wrapper } from '../app/redux/store'
import { appWithTranslation } from 'next-i18next'

import '../styles/main.scss'
import '../styles/main-media-adaptation.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
