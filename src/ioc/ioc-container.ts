import { Container } from 'inversify';
//import TYPES from './types';
import { LogAccess } from '@middlewares';

import { MeResolver } from '@graphql/resolvers';

const container = new Container();

// GraphQL Resolvers dependencies
container.bind<MeResolver>(MeResolver).toSelf();
container.bind<LogAccess>(LogAccess).toSelf();

export default container;
