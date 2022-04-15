import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';
import { ExpensesInput } from '.';

@Controller('/expenses')
export class ExpensesController {
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
}
