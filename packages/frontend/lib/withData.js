import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
// import { endpoint } from '../config';
function createClient({ headers }) {
  console.log(`api endpint: ${process.env.NEXT_PUBLIC_END_POINT}`)
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_END_POINT,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)
