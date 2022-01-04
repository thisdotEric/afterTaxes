import { buildSchema } from 'type-graphql';
import { Container } from '@ioc';
import { MeResolver } from '@graphql/resolvers';

export default function createGraphQLSchema() {
  return buildSchema({
    resolvers: [MeResolver],
    container: Container,
    validate: false,
  });
}
