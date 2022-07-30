import { FC } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

interface OwnProps {
  children: JSX.Element[] | JSX.Element
  keywords?: string[]
}

type Props = OwnProps

const MainContainer: FC<Props> = ({ children }) => {
  const { t } = useTranslation(['head'])

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
      {children}
    </>
  )
}

export default MainContainer
