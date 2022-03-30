// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify from 'fastify';
import cors from 'fastify-cors';
import autoLoad from 'fastify-autoload';
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development';

export default async function createServer() {
  const app = Fastify({ logger: true });

  /**
   * Registers all the plugins found in the plugins directory
   */
  app.register(autoLoad, {
    dir: join(__dirname, '../plugins'),
  });

  /**
   * Autoload all REST endpoints from routes folder
   */
  app.register(autoLoad, {
    dir: join(__dirname, '../routes'),
    options: { prefix: 'v1' },
  });

  app.register(cors, {
    origin: isDev ? 'http://localhost:8080' : process.env.WEBAPP_URL,
    credentials: true,
  });

  return app;
}
