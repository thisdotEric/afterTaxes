import { buildSchema } from 'type-graphql';
import { Container } from '@ioc';
import { MeResolver, AuthenticationResolver } from '@graphql/resolvers';

export default function createGraphQLSchema() {
  return buildSchema({
    resolvers: [MeResolver, AuthenticationResolver],
    container: Container,
    validate: false,
  });
}
