import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';
import { ExpensesInput } from '.';

export interface ExpensesHistory {
  id: number;
  date: Date | string;
  name: string;
  description?: string;
  amount: number;
  budgetType: string;
}

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

  @GET('/:year/:month')
  async getListOfExpenses(
    request: FastifyRequest<{
      Params: { year: number; month: string };
    }>,
    reply: FastifyReply
  ) {
    console.log(request.params.month);

    const data: ExpensesHistory[] = [
      {
        id: 1,
        name: 'Spotify Premium',
        amount: 150.5,
        budgetType: 'Tech',
        date: '13',
      },
      {
        id: 2,
        name: 'Angels Burger',
        amount: 30,
        budgetType: 'Food',
        date: '15',
        description: 'Snack after long rally',
      },
    ];

    return reply.code(200).send(data);
  }
}
