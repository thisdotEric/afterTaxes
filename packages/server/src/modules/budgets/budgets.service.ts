import { Service } from 'fastify-decorators';
import { BudgetsRepository, CategorizedBudget } from './budgets.repository';
import { IBudget } from './budgets.repository';

export interface BudgetBreakdown {
  total: number;
  unallocated: number;
}

@Service()
export class BudgetsService {
  constructor(private readonly budgetRepository: BudgetsRepository) {}

  async add(user_id: number, budget: IBudget) {
    await this.budgetRepository.add(user_id, budget);
  }

  private roundOff(value: number): number {
    return +value.toFixed(2);
  }

  async getBudgetBreakdown(
    user_id: number,
    month: number,
    year: number
  ): Promise<BudgetBreakdown> {
    const budgets = await this.budgetRepository.getBudgets(
      user_id,
      month,
      year
    );
    const categorized_budgets =
      await this.budgetRepository.getCategorizedBudgets(user_id, month, year);

    /**
     * Compute the total budget from the given month and year
     */
    const totalBudget = budgets.reduce(
      (prev, curr) => {
        return { amount: prev.amount + curr.amount };
      },
      {
        amount: 0,
      }
    ).amount;

    /**
     * Compute the total budget allocated (into different categories)
     * from the given month and year
     */
    const totalAllocated = categorized_budgets.reduce(
      (prev, curr) => {
        return { ...prev, budget: prev.budget + curr.budget };
      },
      {
        budget: 0,
      }
    ).budget;

    return {
      total: this.roundOff(totalBudget),
      unallocated: this.roundOff(totalBudget - totalAllocated),
    };
  }

  async getCategorizedBudgets(user_id: number, month: number, year: number) {
    return this.budgetRepository.getCategorizedBudgets(user_id, month, year);
  }

  async createCategorizedBudget(
    user_id: number,
    categorized_budget: Omit<CategorizedBudget, 'id'>
  ) {
    return this.budgetRepository.createCategorizedBudget(
      user_id,
      categorized_budget
    );
  }
}
