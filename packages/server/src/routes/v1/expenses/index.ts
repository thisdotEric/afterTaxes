import { ExpensesController } from '@modules/expenses';
import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import Container from 'typedi';

/**
 * Expenses endpoints
 */
export default (
  server: FastifyInstance,
  _: FastifyPluginOptions,
  next: (error?: FastifyError) => void
) => {
  const { addNewExpenses } = Container.get(ExpensesController);

  server.post('/', addNewExpenses);

  next();
};
