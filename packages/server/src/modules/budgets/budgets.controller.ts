import { FastifyReply, FastifyRequest } from 'fastify';
import { BudgetsService } from './budgets.service';
import { BudgetInput } from './budgets.schema';
import { Controller, POST, GET } from 'fastify-decorators';

@Controller('/budgets')
export class BudgetsController {
  constructor(private readonly budgetService: BudgetsService) {}

  @GET('/:year/:month')
  public async getBudget(
    request: FastifyRequest<{
      Params: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const { year, month } = request.params;

    return reply.code(200).send({
      year,
      month,
    });
  }

  @POST('/')
  public async addNewBudget(
    request: FastifyRequest<{ Body: { budget: BudgetInput } }>,
    reply: FastifyReply
  ) {
    const { budget } = request.body;

    try {
      await this.budgetService.add(budget);
      console.log(budget);
    } catch (error: any) {
      return reply.code(400).send(error);
    }

    return reply.code(201).send(request.body);
  }
}
