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

    const budgetBreakdown = await this.budgetService.getBudgetBreakdown(
      month,
      year
    );

    return reply.code(200).send({
      month,
      year,
      ...budgetBreakdown,
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

  @GET('/:year/:month/categories')
  public async getCategorizedBudgets(
    request: FastifyRequest<{
      Params: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const { month, year } = request.params;

    const categorized_budgets = await this.budgetService.getCategorizedBudgets(
      month,
      year
    );

    return reply.code(201).send(categorized_budgets);
  }
}
