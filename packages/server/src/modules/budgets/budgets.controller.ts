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
    const user_id = request.session.user!.user_id;

    const budgetBreakdown = await this.budgetService.getBudgetBreakdown(
      user_id,
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
      const user_id = request.session.user!.user_id;

      await this.budgetService.add(user_id, budget);
      console.log(budget);
    } catch (error: any) {
      return reply.code(400).send(error);
    }

    return reply.code(201).send(request.body);
  }

  @POST('/categorized-budget')
  public async createNewCategorizedBudget(
    request: FastifyRequest<{
      Body: {
        categorized_budget: {
          budget: number;
          name: string;
          category: string;
        };
      };
    }>,
    reply: FastifyReply
  ) {
    const { categorized_budget } = request.body;
    const user_id = request.session.user!.user_id;

    await this.budgetService.createCategorizedBudget(
      user_id,
      categorized_budget
    );

    return reply.code(201).send('Ok');
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
    const user_id = request.session.user!.user_id;

    const categorized_budgets = await this.budgetService.getCategorizedBudgets(
      user_id,
      month,
      year
    );

    return reply.code(201).send(categorized_budgets);
  }
}
