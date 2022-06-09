import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, POST } from 'fastify-decorators';
import { ExpensesService } from './expenses.service';
import { ExpensesHistory } from '@aftertaxes/commons';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @POST('/')
  async addNewExpenses(
    request: FastifyRequest<{
      Body: Omit<ExpensesHistory, 'id' | 'budgetName'>;
    }>,
    reply: FastifyReply
  ) {
    const newExpense = request.body;

    const user_id = request.session.user!.user_id;

    await this.expensesService.addNewExpense(user_id, newExpense);

    return reply.code(201).send('New expenses saved');
  }

  @DELETE('/:expenseId')
  async deleteExpense(
    request: FastifyRequest<{
      Params: { expenseId: number };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;
    const expenses_id = request.params.expenseId;

    await this.expensesService.deleteExpensesItem(user_id, expenses_id);

    return reply.code(200).send('Ok');
  }

  @GET('/:year/:month')
  async getListOfExpenses(
    request: FastifyRequest<{
      Params: { year: number; month: number };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;
    const { year, month } = request.params;

    const expenses = await this.expensesService.getAllExpenses(
      user_id,
      month,
      year
    );

    return reply.code(200).send(expenses);
  }
}
