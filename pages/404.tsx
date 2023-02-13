import { GetServerSideProps, NextPage } from 'next'

import { addServerSideTranslations, headerTranslationNamespaces } from '../app/helpers'

interface OwnProps {}

type Props = OwnProps

const ErrorPage: NextPage<Props> = (props) => {
  return (
    <>
      <h1>Error</h1>
    </>
  )
}

export default ErrorPage
