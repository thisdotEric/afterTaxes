import { FastifyReply, FastifyRequest } from 'fastify';
import { BudgetsService } from './budgets.service';
import { BudgetListInput } from './budgets.schema';
import { Controller, POST, GET } from 'fastify-decorators';

@Controller('/budgets')
export class BudgetsController {
  constructor(private readonly budgetService: BudgetsService) {}

  @GET('/')
  public async getBudgets(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(request.body);
  }

  @POST('/')
  public async addNewBudget(
    request: FastifyRequest<{ Body: { budgets: BudgetListInput } }>,
    reply: FastifyReply
  ) {
    const { budgets } = request.body;

    try {
      await this.budgetService.add(budgets);
    } catch (error: any) {
      return reply.code(400).send(error);
    }

    return reply.code(201).send(request.body);
  }
}
