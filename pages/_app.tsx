import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { appWithTranslation } from 'next-i18next'

import { wrapper } from '../app/redux/store'
import { Layout } from '../app/components'

import colors from '../styles/colors.module.scss'
import '../styles/main.scss'
import '../styles/main-media-adaptation.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <NextNProgress
        height={3}
        options={{ showSpinner: true, easing: 'linear', speed: 300, trickleSpeed: 100 }}
        color={colors.mainColor}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
