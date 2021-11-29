// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { AppContext } from '@types';
import createGraphQLSchema from './build-schema';
import { resolve, join } from 'path';
import fastifyStaticFiles from 'fastify-static';
import { redis } from '@utils/redis';
import { writeFileSync } from 'fs';

const PORT = process.env.PORT || 3000;
const API_PATH = '/api/v1';

const app = Fastify();

const main = async () => {
  // Create the google authentication JSON file
  await redis.connect();

  const authObject = await redis.get(process.env.REDIS_GOOGLE_AUTH_KEY!);
  writeFileSync(
    // make sure to create 'authentication' folder inside src directory
    join(__dirname, 'authentication', process.env.GOOGLE_AUTH_JSON_FILENAME!),
    authObject!
  );

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
  app.listen(PORT, '0.0.0.0', (error: Error, address: string) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }

    console.log(`afterTaxes server started on ${address}${API_PATH}`);
  });
};

main();
