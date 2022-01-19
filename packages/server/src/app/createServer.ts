// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './buildSchema';
import cors from 'fastify-cors';

export default async function createServer() {
  const app = Fastify();

  app.register(cors, {
    origin: '*',
  });

  /**
   * Generate GraphQL Schema
   */
  const schema = await createGraphQLSchema();

  app.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    path: `${process.env.API_PATH}`,
    context: (request: FastifyRequest, _): AppContext => {
      return {
        req: request,
      };
    },
  });

  app.setNotFoundHandler(async (_, _reply) => {
    return 'Ok';
  });

  return app;
}
