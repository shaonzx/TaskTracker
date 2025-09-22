import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create HTTP link to your GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL 
    ? `${process.env.REACT_APP_API_URL}/graphql`
    : 'http://localhost:5000/graphql', // Fallback for development
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  // Default options for queries
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;