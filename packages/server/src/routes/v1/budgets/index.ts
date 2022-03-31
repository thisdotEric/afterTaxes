import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

export default (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  fastify.get('/', async (_, _reply) => {
    return 'budgets';
  });

  next();
};
