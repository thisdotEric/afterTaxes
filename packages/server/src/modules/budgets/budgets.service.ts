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

  private roundOff(value: number): number {
    return +value.toFixed(2);
  }

  async getBudgetBreakdown(
    month: number,
    year: number
  ): Promise<BudgetBreakdown> {
    const budgets = await this.budgetRepository.getBudgets(month, year);
    const categorized_budgets =
      await this.budgetRepository.getCategorizedBudgets(month, year);

    /**
     * Compute the total budget from the given month and year
     */
    const totalBudget = budgets.reduce((prev, curr) => {
      return { amount: prev.amount + curr.amount };
    }).amount;

    /**
     * Compute the total budget allocated (into different categories)
     * from the given month and year
     */
    const totalAllocated = categorized_budgets.reduce((prev, curr) => {
      return { ...prev, budget: prev.budget + curr.budget };
    }).budget;

    return {
      total: this.roundOff(totalBudget),
      unallocated: this.roundOff(totalBudget - totalAllocated),
    };
  }

  async getCategorizedBudgets(month: number, year: number) {
    return this.budgetRepository.getCategorizedBudgets(month, year);
  }
}
