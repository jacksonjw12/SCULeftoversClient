
/* eslint no-underscore-dangle: 0 */

import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import env from '../environment'
//
// import resolvers from './clientStateResolvers'
// import defaults from './clientStateDefaults'
// import typeDefs from './clientStateTypeDefs'

// import config from '../../config'

const uri = env.server+`/graphql`
const cache = new InMemoryCache(global.__APOLLO_STATE__)
const httpLink = createHttpLink({
  uri,
  credentials: 'same-origin',
})
// const localResolveLink = withClientState({
//   cache,
//   defaults,
//   resolvers,
//   typeDefs,
// })

export default () => new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
  addTypename: true,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  },
})
