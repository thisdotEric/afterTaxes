// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export default async function createServer() {
  const server = Fastify({ logger: true });

  /**
   * Registers all the plugins found in the plugins directory
   */
  server.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  server.register(cors, {
    origin: isDev ? 'http://localhost:8080' : process.env.WEBAPP_URL,
    credentials: true,
  });

  return server;
}
