import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fSession from '@fastify/session';
import fastifyCookie from 'fastify-cookie';
import { knex } from 'knex';
import configs from '@database/knex/knexfile';
import { SESSIONS } from '@database/constants';
import connectKnex from 'connect-session-knex';

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

    const KnexSessionStore = connectKnex(fSession);

    const store = new KnexSessionStore({
      knex: knex(configs[`${process.env.NODE_ENV}`]),
      tablename: SESSIONS,
      createtable: true,
    });

    fastify.register(fSession, {
      secret: `${process.env.SESSION_SECRET}`,
      cookieName: 'sid',
      store,
      cookie: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_TTL,
        httpOnly: process.env.NODE_ENV === 'production',
      },
    });

    next();
  }
);
