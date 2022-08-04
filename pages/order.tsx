import { GetServerSideProps, NextPage } from 'next'

import { addServerSideTranslations, headerTranslationNamespaces } from '../app/helpers'

interface OwnProps {}

type Props = OwnProps

const Order: NextPage<Props> = (props) => {
  return <h1>Order page</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await addServerSideTranslations(headerTranslationNamespaces, context)),
    },
  }
}

export default Order
