import { Sessions } from '@controllers';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import Container from 'typedi';
import { $ref } from './sessions.schema';

export default (
  server: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  const { login: loginHandler } = Container.get(Sessions);

  /**
   * Login route
   * Expects email and password from the request body
   */
  server.post(
    '/',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );

  next();
};
