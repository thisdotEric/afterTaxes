import { Service } from 'fastify-decorators';
import { BudgetsRepository } from './budgets.repository';
import { IBudget } from './budgets.repository';

@Service()
export class BudgetsService {
  constructor(private readonly budgetRepository: BudgetsRepository) {}

  async add(budget: IBudget) {
    await this.budgetRepository.add(budget);
  }
}
