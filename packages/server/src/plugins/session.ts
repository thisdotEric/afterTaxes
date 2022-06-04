import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fastifySession from '@mgcrea/fastify-session';
import fastifyCookie from 'fastify-cookie';
import KnexStore from 'fastify-session-knex-store';
import { knex } from 'knex';
import configs from '@database/knex/knexfile';

const SESSION_TTL = 6.048e5; // 7 day in seconds

/**
 * Plugin that sets up session authentication
 */
export default fp(
  async (
    fastify: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    fastify.register(fastifyCookie);

    const store = new KnexStore({
      client: knex(configs[`${process.env.NODE_ENV}`]),
      ttl: SESSION_TTL,
      table: 'sessions',
    });

    fastify.register(fastifySession, {
      secret: `${process.env.SESSION_SECRET}`,
      cookieName: 'sid',
      store,
      cookie: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_TTL,
      },
    });

    next();
  }
);
