// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './build-schema';
import MercuriusGQLUpload from 'mercurius-upload';
import cors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

const PORT = process.env.PORT || 3000;
const API_PATH = '/api/v1';

const app = Fastify();

const main = async () => {
  // Create GraphQL schemas
  const schema = await createGraphQLSchema();

  // Mercurius graphql upload plugin
  app.register(MercuriusGQLUpload);

  app.register(cors, {
    origin: '*',
  });

  app.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    path: API_PATH,
    context: (request: FastifyRequest, _): AppContext => {
      return {
        req: request,
      };
    },
  });

  app.register(fastifyStatic, {
    root: join(__dirname, '../web', 'build'),
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

  // Run the application
  app.listen(PORT, '0.0.0.0', (error: Error | null, address: string) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }

    console.log(`afterTaxes server started on ${address}${API_PATH}`);
  });
};

main();
