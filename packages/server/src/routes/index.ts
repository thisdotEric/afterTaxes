import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

/**
 * Home app route
 */
export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  fastify.get('/', async (_, _reply) => {
    return 'Home page';
  });

  next();
};
