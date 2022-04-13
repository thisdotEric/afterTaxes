import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

/**
 * Home app route
 */
export default (
  server: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  server.get('/', async (_, _reply) => {
    return 'Home page';
  });

  server.get('/healthcheck', async (_, _reply) => {
    return { status: 'Ok' };
  });

  next();
};
