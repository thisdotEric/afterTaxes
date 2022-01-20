import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie';
import knexSessionStore from 'connect-session-knex';
import { knex } from 'knex';
import configs from '@database/knex/knexfile';

/**
 * Plugin that sets up session authentication
 */
export default fp(
  (
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): void => {
    fastify.register(fastifyCookie);

    const KnexSessionStore = knexSessionStore(fastifySession);
    const store = new KnexSessionStore({
      knex: knex(configs[`${process.env.NODE_ENV}`]),
    });

    fastify.register(fastifySession, {
      secret: `${process.env.SESSION_SECRET}`,
      cookieName: 'sid',
      store,
      cookie: {
        path: '/',
        secure: false,
      },
    });

    next();
  }
);
