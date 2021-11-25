// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './build-schema';
import MercuriusGQLUpload from 'mercurius-upload';
import AltairFastify from 'altair-fastify-plugin';

const PORT = process.env.PORT || 3000;
const API_PATH = '/api/v1';

const app = Fastify();

const main = async () => {
  // Create GraphQL schemas
  const schema = await createGraphQLSchema();

  // Mercurius graphql upload plugin
  app.register(MercuriusGQLUpload);

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

  // Setup (altair) GraphQL playground on development only
  if (process.env.NODE_ENV === 'development') {
    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: API_PATH,
    });
  }

  // Run the application
  app.listen(PORT, () => {
    console.log(
      `afterTaxes server started on ${process.env.APP_TAXES_URL}:${PORT}${API_PATH}`
    );
  });
};

main();
