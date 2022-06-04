import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import { bootstrap } from 'fastify-decorators';
import { BudgetsController } from '@modules/budgets';
import { ExpensesController } from '@modules/expenses';
import { SessionsController } from '@modules/sessions';

export default fp(
  async (
    server: FastifyInstance,
    _: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): Promise<void> => {
    server.register(bootstrap, {
      controllers: [BudgetsController, ExpensesController, SessionsController],
      prefix: 'api/v1',
    });

    next();
  }
);
