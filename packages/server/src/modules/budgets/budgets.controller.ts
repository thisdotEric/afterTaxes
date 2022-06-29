import { FastifyReply, FastifyRequest } from 'fastify';
import { BudgetsService } from './budgets.service';
import { BudgetInput } from './budgets.schema';
import { Controller, POST, GET, PATCH, DELETE } from 'fastify-decorators';
import { BudgetCategory } from './budgetTypes.repository';

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
          budget_type_id: number;
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
      Querystring: {
        id: number;
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

    // Filter results if id is provided on the query string
    if (request.query.id != undefined) {
      return reply
        .code(200)
        .send(
          categorized_budgets.filter(i => i.budget_type_id == request.query.id)
        );
    } else return reply.code(200).send(categorized_budgets);
  }

  @GET('/categories')
  public async getAllBudgetTypes(
    request: FastifyRequest<{
      Params: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;

    const budgetTypes = await this.budgetService.getAllBudgetTypes(user_id);

    return reply.code(201).send(budgetTypes);
  }

  @POST('/categories')
  public async addNewBudgetCategory(
    request: FastifyRequest<{
      Body: BudgetCategory;
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;
    const { name, description } = request.body;

    console.log(user_id, request.body);

    await this.budgetService.addNewBudgetCategory(user_id, {
      name,
      description,
    });

    return reply.code(201).send('Ok');
  }

  @DELETE('/:budget_id')
  public async deleteAllocatedBudget(
    request: FastifyRequest<{
      Params: {
        budget_id: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;
    const { budget_id } = request.params;

    await this.budgetService.deleteCategorizedBudget(user_id, budget_id);

    return reply.code(201).send('Ok');
  }
  @DELETE('/categories/:category_id')
  public async disableBudgetCategory(
    request: FastifyRequest<{
      Params: {
        category_id: number;
      };
      Querystring: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;
    const { category_id } = request.params;
    const { year, month } = request.query;

    await this.budgetService.disableBudgetCategory(
      user_id,
      category_id,
      month,
      year
    );

    return reply.code(201).send('Ok');
  }

  @GET('/:year/:month/remaining')
  public async getRemainingBudget(
    request: FastifyRequest<{
      Params: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;

    const { month, year } = request.params;

    const remainingBudgets =
      await this.budgetService.getRemainingBudgetPerCategory(
        user_id,
        month,
        year
      );

    return reply.code(200).send(remainingBudgets);
  }

  @GET('/:year/:month/history')
  public async getBudgetHistory(
    request: FastifyRequest<{
      Params: {
        year: number;
        month: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;

    const { month, year } = request.params;

    const fundsHistory = await this.budgetService.getAddedFundsHistory(
      user_id,
      month,
      year
    );

    return reply.code(200).send(fundsHistory);
  }

  @PATCH('/transfer')
  public async transferBudget(
    request: FastifyRequest<{
      Body: {
        from: number;
        to: number;
        amount: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const user_id = request.session.user!.user_id;

    const transferBudgetInfo = request.body;
    await this.budgetService.transferBudget(user_id, transferBudgetInfo);

    return reply.code(200).send('Ok');
  }
}
