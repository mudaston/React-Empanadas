import { GetStaticProps, NextPage } from 'next'

import { addServerSideTranslations, headerTranslationNamespaces } from '../app/helpers'

interface OwnProps {}

type Props = OwnProps

const ErrorPage: NextPage<Props> = (props) => {
  return (
    <>
      <h1>505 server error</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await addServerSideTranslations(headerTranslationNamespaces, context)),
    },
  }
}

export default ErrorPage
