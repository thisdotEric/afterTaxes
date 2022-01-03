// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './buildSchema';
import MercuriusGQLUpload from 'mercurius-upload';
import cors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

export default async function createServer() {
  const app = Fastify();

  // Mercurius graphql upload plugin
  app.register(MercuriusGQLUpload);

  app.register(cors, {
    origin: '*',
  });

  // Create GraphQL schemas
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

  /**
   * Make sure to point root to web directory,
   * In this case, 2 directories above.
   */
  app.register(fastifyStatic, {
    root: join(__dirname, '../../web', 'build'),
  });

  /**
   * Catch all route
   *
   * This works on serving the frontend when url is entered on the browser
   * Still contemplating if this is really the right way.
   */
  app.setNotFoundHandler(async (_, reply: FastifyReply) => {
    return reply.sendFile('index.html');
  });

  return app;
}
