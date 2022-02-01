import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient(
  import.meta.env.SNOWPACK_PUBLIC_AFTERTAXES_SERVER,
  {
    credentials: 'include',
  }
);

export default graphql;
