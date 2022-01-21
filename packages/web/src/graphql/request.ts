import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient('http://localhost:3000/api/v1', {
  credentials: 'include',
});

export default graphql;
