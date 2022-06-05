export interface ExpensesHistory {
  name: string;
  description?: string;
  amount: number;
  category: number;
}

export class ExpensesComputationService {
  public computeTotalExpensesPerCategory(
    expensesHistory: ExpensesHistory[]
  ): Map<number, number> {
    /**
     * Map of total expenses
     * key: category id
     * value: accumulated amount
     */
    const map = new Map<number, number>();

    for (let { category, amount } of expensesHistory) {
      const prevAmount: number =
        map.get(category) === undefined ? 0 : (map.get(category) as number);

      map.set(category, prevAmount + amount);
    }

    return map;
  }
}
