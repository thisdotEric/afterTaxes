export interface RemainingBudget {
  budget_id: number;
  name: string;
  remainingBudget: number;
}

export interface CategorizedBudget {
  id: number;
  name: string;
  budget: number;
  budget_type_id: number;
}

export class BudgetComputationService {
  public computeTotalBudgetPerCategory(
    budgets: CategorizedBudget[]
  ): Map<number, number> {
    const totalBudget = new Map<number, number>();

    for (let { id, budget } of budgets) {
      const prevAmount: number =
        totalBudget.get(id) === undefined ? 0 : (totalBudget.get(id) as number);

      totalBudget.set(id, prevAmount + budget);
    }

    return totalBudget;
  }

  public computeRemainingBalancePerCategory(
    expensesMap: Map<number, number>,
    budgets: CategorizedBudget[]
  ): RemainingBudget[] {
    let remainingBudgets: RemainingBudget[] = [];

    const totalBudgetPerCategory = this.computeTotalBudgetPerCategory(budgets);

    totalBudgetPerCategory.forEach((totalBudget, key) => {
      const totalExpenses: number = expensesMap.has(key)
        ? (expensesMap.get(key) as number)
        : 0;

      const remainingBudget = totalBudget - totalExpenses;

      if (remainingBudget > 0) {
        remainingBudgets.push({
          budget_id: key,
          name: budgets.filter((b) => b.id === key)[0].name,
          remainingBudget,
        });
      }
    });

    return remainingBudgets;
  }
}
