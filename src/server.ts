// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './build-schema';
import { resolve } from 'path';
import fastifyStaticFiles from 'fastify-static';

const PORT: string = process.env.PORT!;
const API_PATH = '/api/v1';

const app = Fastify();

const main = async () => {
  // Create GraphQL schemas
  const schema = await createGraphQLSchema();

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

  // Serve static files
  app.register(fastifyStaticFiles, {
    root: resolve(__dirname, '../web', 'build'),
  });

  app.get('/', (_, reply: FastifyReply) => {
    // Serve the frontend application
    reply.sendFile('index.html');
  });

  // Run the application
  app.listen(PORT, () => {
    console.log(
      `afterTaxes server started on ${process.env.APP_TAXES_URL}:${PORT}${API_PATH}`
    );
  });
};

main();
