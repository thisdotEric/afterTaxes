import { buildSchema } from 'type-graphql';
import { Container } from '@ioc';
import { MeResolver, ReceiptResolver } from '@graphql/resolvers';

export default function createGraphQLSchema() {
  return buildSchema({
    resolvers: [MeResolver, ReceiptResolver],
    container: Container,
    validate: false,
  });
}
