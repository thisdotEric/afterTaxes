import { BudgetController } from '@modules/budgets';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import Container from 'typedi';

export default (
  server: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  const { addNewBudget } = Container.get(BudgetController);

  server.get('/', async (_, _reply) => {
    return 'budgets';
  });

  server.post('/', addNewBudget);

  next();
};
