import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from 'typedi';
import BudgetService from './budget.service';
import { BudgetListInput } from './budget.schema';

@Service()
export default class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  /**
   * Add new budgets
   * @param request
   * @param reply
   * @returns
   */
  async addNewBudget(
    request: FastifyRequest<{ Body: { budgets: BudgetListInput } }>,
    reply: FastifyReply
  ) {
    const { budgets } = request.body;

    try {
      await this.budgetService.sdfsd(budgets);
    } catch (error: any) {
      return reply.code(400).send(error);
    }

    return reply.code(201).send(request.body);
  }
}
