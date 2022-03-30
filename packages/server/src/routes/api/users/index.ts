import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyReply,
} from 'fastify';

export default fp(
  async (
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    fastify.get('/users', (_, reply: FastifyReply) => {
      reply.send({ hello: 'users' });
    });

    next();
  }
);

export const autoPrefix = '/users';
