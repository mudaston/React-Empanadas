import { GetStaticProps, NextPage } from 'next'

import { addHeaderTranslation } from '../app/helpers'

interface OwnProps {}

type Props = OwnProps

const ErrorPage: NextPage<Props> = (props) => {
  return (
    <>
      <h1>Error</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await addHeaderTranslation(context)),
    },
  }
}

export default ErrorPage
