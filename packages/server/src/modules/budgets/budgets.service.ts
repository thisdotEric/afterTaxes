import { Service } from 'fastify-decorators';
import { BudgetsRepository } from './budgets.repository';
import { IBudget } from './budgets.repository';

export interface BudgetBreakdown {
  total: number;
  unallocated: number;
}

@Service()
export class BudgetsService {
  constructor(private readonly budgetRepository: BudgetsRepository) {}

  async add(budget: IBudget) {
    await this.budgetRepository.add(budget);
  }

  async getBudgetBreakdown(
    month: number,
    year: number
  ): Promise<BudgetBreakdown> {
    const budgets = await this.budgetRepository.getBudgets(month, year);

    /**
     * Compute the total budget from the given month and year
     */
    const totalBudget = budgets.reduce((prev, curr) => {
      return { amount: prev.amount + curr.amount };
    }).amount;

    return {
      total: totalBudget,
      unallocated: 10,
    };
  }
}
