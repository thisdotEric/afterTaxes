export interface ExpensesHistory {
  id: number;
  date?: Date;
  name: string;
  description?: string;
  amount: number;
  budget_id: number;
  budgetName: string;
}

export class ExpensesComputationService {
  public computeTotalExpensesPerCategory(
    expensesHistory: ExpensesHistory[]
  ): Map<number, number> {
    /**
     * Map of total expenses
     * key: budget id
     * value: accumulated amount
     */
    const map = new Map<number, number>();

    for (let { budget_id, amount } of expensesHistory) {
      const prevAmount: number =
        map.get(budget_id) === undefined ? 0 : (map.get(budget_id) as number);

      map.set(budget_id, prevAmount + amount);
    }

    return map;
  }
}
