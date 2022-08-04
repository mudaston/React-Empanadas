import { GetServerSideProps, NextPage } from 'next'

import { addServerSideTranslations } from '../app/helpers'

interface OwnProps {}

type Props = OwnProps

const Order: NextPage<Props> = (props) => {
  return <h1>Order page</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await addServerSideTranslations(context)),
    },
  }
}

export default Order
