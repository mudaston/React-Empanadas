import { FC } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import { Header } from '../index'

interface OwnProps {
  children: JSX.Element[] | JSX.Element
}

type Props = OwnProps

const Layout: FC<Props> = ({ children }) => {
  const { t } = useTranslation(['head', 'home'])

  return (
    <>
      <Head>
        <meta name='description' content={t('head:description')} />
        <meta
          name='viewport'
          content='width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0'
        />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Altanka</title>
      </Head>
      <Header subtitle={t('home:subheader')} />
      <main style={{ paddingTop: '10rem' }}>{children}</main>
    </>
  )
}

export default Layout
