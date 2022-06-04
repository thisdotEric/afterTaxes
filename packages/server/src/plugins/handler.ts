import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

export default fp(
  async (
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    fastify.addHook(
      'preHandler',
      (request: FastifyRequest, reply: FastifyReply, next) => {
        const user = request.session.user;

        if (!user) reply.code(401).send('Unauthorized');
        else next();
      }
    );

    next();
  }
);
