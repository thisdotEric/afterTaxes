import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

/**
 * Plugin for home page route of the API
 */
export default fp(
  async (
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    fastify.get('/', async (_, _reply) => {
      return 'Ok';
    });

    next();
  }
);
