import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import { bootstrap } from 'fastify-decorators';
import { BudgetsController } from '@modules/budgets';
import { ExpensesController } from '@modules/expenses';
import { SessionsController } from '@modules/sessions';
import { UsersController } from '@modules/users';

export default fp(
  async (
    server: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    server.register(bootstrap, {
      controllers: [
        BudgetsController,
        ExpensesController,
        SessionsController,
        UsersController,
      ],
      prefix: 'api/v1',
    });

    next();
  }
);
