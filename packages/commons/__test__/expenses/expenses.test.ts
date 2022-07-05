import {
  ExpensesComputationService,
  ExpensesHistory,
} from '../../src/business/expenses/expenses';

describe('Expenses Computation Service', () => {
  let expensesHistory: ExpensesHistory[];

  beforeAll(() => {
    expensesHistory = [
      {
        amount: 100,
        budget_id: 1,
        name: 'Foood',
        budgetName: '',
        id: 1,
      },
      {
        amount: 23,
        budget_id: 2,
        name: 'Tech',
        budgetName: '',
        id: 1,
      },
      {
        amount: 12,
        budget_id: 1,
        name: 'Friday night',
        budgetName: '',
        id: 1,
      },
      {
        amount: 100,
        budget_id: 1,
        name: 'Lunch',
        budgetName: '',
        id: 1,
      },
    ];
  });

  it('should compute the total expenses grouped by budget category', () => {
    const expensesComputation = new ExpensesComputationService();

    const expected = new Map<number, number>();
    expected.set(1, 212).set(2, 23);

    const actual =
      expensesComputation.computeTotalExpensesPerCategory(expensesHistory);

    expect(actual).toStrictEqual(expected);
  });
});
