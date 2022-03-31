// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import Fastify from 'fastify';
import cors from 'fastify-cors';
import AutoLoad from 'fastify-autoload';
import { join } from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export default async function createServer() {
  const app = Fastify({ logger: true });

  /**
   * Registers all the plugins found in the plugins directory
   */
  app.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  /**
   * Autoload all REST endpoints from routes folder
   */
  app.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    dirNameRoutePrefix: (folderParent, folderName) => {
      const v1RoutesPath = join(__dirname, 'routes/v1');

      let prefixRoute = 'api';

      if (folderParent === v1RoutesPath) prefixRoute = 'v1/' + folderName;

      return prefixRoute;
    },
  });

  app.register(cors, {
    origin: isDev ? 'http://localhost:8080' : process.env.WEBAPP_URL,
    credentials: true,
  });

  return app;
}
