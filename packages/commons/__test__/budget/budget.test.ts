import {
  BudgetComputationService,
  Budget,
  RemainingBudget,
} from '../../src/business/budget';

describe('Budget Computation Service ', () => {
  let budgets: Budget[];
  let budgetComputation: BudgetComputationService;

  beforeAll(() => {
    budgetComputation = new BudgetComputationService();

    budgets = [
      {
        budget: 100,
        budget_type_id: 2,
        id: 1,
        name: 'Tech',
      },
      {
        budget: 56,
        budget_type_id: 2,
        id: 2,
        name: 'Tech',
      },
      {
        budget: 56,
        budget_type_id: 1,
        id: 3,
        name: 'Food',
      },
    ];
  });

  it('compute the remaining budget grouped by budget category', () => {
    const map = new Map<number, number>();
    map.set(2, 112);

    const expected: RemainingBudget[] = [
      {
        budget_id: 2,
        name: 'Tech',
        remainingBudget: 44,
      },
      {
        budget_id: 1,
        name: 'Food',
        remainingBudget: 56,
      },
    ];

    const actual = budgetComputation.computeRemainingBalancePerCategory(
      map,
      budgets
    );
    expect(actual).toStrictEqual(expected);
  });

  it('should compute total budget per category', () => {
    const totalBudgetMap = new Map<number, number>();
    totalBudgetMap.set(2, 156);
    totalBudgetMap.set(1, 56);

    const actual = budgetComputation.computeTotalBudgetPerCategory(budgets);

    expect(actual).toStrictEqual(totalBudgetMap);
  });
});
