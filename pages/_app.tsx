import type { AppProps } from 'next/app'
import { wrapper } from '../app/redux/store'
import { appWithTranslation } from 'next-i18next'
import NextNProgress from 'nextjs-progressbar'

import colors from '../styles/colors.module.scss'
import '../styles/main.scss'
import '../styles/main-media-adaptation.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <NextNProgress
        height={5}
        options={{ showSpinner: true, easing: 'linear', speed: 300, trickleSpeed: 100 }}
        color={colors.mainColor}
      />
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
