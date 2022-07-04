import { ExpensesRepository } from '@modules/expenses';
import { Service } from 'fastify-decorators';
import { BudgetsRepository } from './budgets.repository';
import { IBudget } from './budgets.repository';
import { BudgetTypesRepository } from './budgetTypes.repository';
import {
  ExpensesComputationService,
  BudgetComputationService,
  CategorizedBudget,
  RemainingBudget,
} from '@aftertaxes/commons';
import { BudgetCategory } from './budgetTypes.repository';

export interface BudgetBreakdown {
  total: number;
  unallocated: number;
}

interface ITransferBudget {
  from: number;
  to: number;
  amount: number;
}

@Service()
export class BudgetsService {
  constructor(
    private readonly budgetRepository: BudgetsRepository,
    private readonly budgetTypesRepo: BudgetTypesRepository,
    private readonly expensesRepo: ExpensesRepository
  ) {}

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
    const budgets = await this.budgetRepository.getCategorizedBudgets(
      user_id,
      month,
      year
    );

    // Compute for the remaining budgets per catergory
    const remainingBudgets = await this.computeRemainingBudgets(
      user_id,
      month,
      year
    );

    const withRemainingBudgets = budgets.map(b => {
      let remainingBudget = 0;

      try {
        remainingBudget = remainingBudgets.filter(
          ({ budget_id }) => budget_id == b.id
        )[0].remainingBudget;
      } catch (error) {
        remainingBudget = 0;
      }

      return {
        ...b,
        remainingBudget,
      };
    });

    return withRemainingBudgets;
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

  async getAllBudgetTypes(user_id: number) {
    return this.budgetTypesRepo.getAllBudgetTypes(user_id);
  }

  async getRemainingBudgetPerCategory(
    user_id: number,
    month: number,
    year: number
  ): Promise<RemainingBudget[]> {
    return this.computeRemainingBudgets(user_id, month, year);
  }

  async transferBudget(user_id: number, transferBudgetInfo: ITransferBudget) {
    const fromBudget = await this.budgetRepository.getBudget(
      user_id,
      transferBudgetInfo.from
    );

    const destinationBudget = await this.budgetRepository.getBudget(
      user_id,
      transferBudgetInfo.to
    );

    const newSourceAmount = fromBudget.budget - transferBudgetInfo.amount;
    const newDestinationBudgetAmount =
      destinationBudget.budget + transferBudgetInfo.amount;

    const updateSourceBudget = this.budgetRepository.updateBudget(
      user_id,
      newSourceAmount,
      transferBudgetInfo.from
    );

    const updateDestinationBudget = this.budgetRepository.updateBudget(
      user_id,
      newDestinationBudgetAmount,
      transferBudgetInfo.to
    );

    await Promise.all([updateSourceBudget, updateDestinationBudget]);
  }

  private async computeRemainingBudgets(
    user_id: number,
    month: number,
    year: number,
    filterBy?: number
  ): Promise<RemainingBudget[]> {
    const allExpenses = await this.expensesRepo.getAllExpenses(
      user_id,
      month,
      year
    );

    const expensesComputation = new ExpensesComputationService();
    const budgetComputation = new BudgetComputationService();

    const map =
      expensesComputation.computeTotalExpensesPerCategory(allExpenses);

    let categorized_budget;

    if (filterBy)
      categorized_budget = (
        await this.budgetRepository.getCategorizedBudgets(user_id, month, year)
      ).filter(b => b.budget_type_id == filterBy);
    else
      categorized_budget = await this.budgetRepository.getCategorizedBudgets(
        user_id,
        month,
        year
      );

    const remainingBudgets =
      budgetComputation.computeRemainingBalancePerCategory(
        map,
        categorized_budget
      );

    return remainingBudgets;
  }

  async getAddedFundsHistory(user_id: number, month: number, year: number) {
    return this.budgetRepository.getBudgets(user_id, month, year);
  }

  async addNewBudgetCategory(user_id: number, budgetCategory: BudgetCategory) {
    return this.budgetTypesRepo.addNewBudgetCategory(user_id, budgetCategory);
  }

  async deleteCategorizedBudget(user_id: number, budget_id: number) {
    const expenses = await this.expensesRepo.getAllExpensesByID(budget_id);

    const totalExpenses = expenses.reduce((prev, next) => {
      return prev + next.amount;
    }, 0);

    await this.budgetRepository.add(user_id, {
      amount: totalExpenses * -1,
      description: `Budget allocated to 'SoundCloud' removed`,
    });

    await this.budgetRepository.deleteCategorizedBudget(user_id, [budget_id]);
  }

  async disableBudgetCategory(
    user_id: number,
    category_id: number,
    month: number,
    year: number
  ) {
    /**
     * Important note
     *
     * Make sure to settle all the budgets from the past month to
     * avoid conflicts.
     */

    const remainingBudgetsToBeRemoved = await this.computeRemainingBudgets(
      user_id,
      month,
      year,
      category_id
    );

    const budget_ids_toBeZeroedOut = remainingBudgetsToBeRemoved.map(
      ({ budget_id }) => budget_id
    );

    const allExpenses = await this.expensesRepo.getAllExpenses(
      user_id,
      month,
      year
    );

    const totalExpenses = allExpenses
      .filter(b => b.budget_id == category_id)
      .reduce((prev, next) => {
        return prev + next.amount;
      }, 0);

    const budgetTypeName = await this.budgetTypesRepo.getBudgetTypeName(
      category_id
    );

    await this.budgetRepository.deleteCategorizedBudget(
      user_id,
      budget_ids_toBeZeroedOut
    );
    await this.budgetTypesRepo.deleteBudgetCategory(user_id, category_id);

    await this.budgetRepository.add(user_id, {
      amount: totalExpenses * -1,
      description: `Budget from '${budgetTypeName}' removed`,
    });
  }
}
