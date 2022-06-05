import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';
import { ExpensesService } from './expenses.service';
import { ExpensesInput } from './expenses.schema';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @GET('/')
  async addNewExpenses(
    request: FastifyRequest<{
      Body: ExpensesInput;
    }>,
    reply: FastifyReply
  ) {
    const expenses = request.body;

    console.log(expenses);

    return reply.code(201).send('New expenses saved');
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
