import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { join } from 'path';
import fastifyStatic from '@fastify/static';
import { bootstrap } from 'fastify-decorators';
import { BudgetsController } from '@modules/budgets';
import { ExpensesController } from '@modules/expenses';
import { SessionsController } from '@modules/sessions';
import { UsersController } from '@modules/users';
import { HomeController } from '@modules/home';

const API_ROUTE = '/api/v1';

export default fp(
  async (
    server: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    server.register(fastifyStatic, {
      root: join(__dirname, '../../../web/build/'),
    });

    server.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
      reply.sendFile('./index.html');
    });

    server.setNotFoundHandler(
      (request: FastifyRequest, reply: FastifyReply) => {
        if (request.url === API_ROUTE) reply.redirect(`${API_ROUTE}/`);
        else reply.sendFile('./index.html');
      }
    );

    server.register(bootstrap, {
      controllers: [
        BudgetsController,
        ExpensesController,
        SessionsController,
        UsersController,
        HomeController,
      ],
      prefix: API_ROUTE,
    });

    next();
  }
);
