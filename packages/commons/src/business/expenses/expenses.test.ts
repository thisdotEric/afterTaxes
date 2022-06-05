import { ExpensesComputationService, ExpensesHistory } from './expenses';

describe('Expenses Computation Service', () => {
  let expensesHistory: ExpensesHistory[];

  beforeAll(() => {
    expensesHistory = [
      {
        amount: 100,
        category: 1,
        name: 'Foood',
      },
      {
        amount: 23,
        category: 2,
        name: 'Tech',
      },
      {
        amount: 12,
        category: 1,
        name: 'Friday night',
      },
      {
        amount: 100,
        category: 1,
        name: 'Lunch',
      },
    ];
  });

  it('should compute the total expenses grouped by budget category', () => {
    const expensesComputation = new ExpensesComputationService();

    let expected = new Map<number, number>();
    expected.set(1, 212);
    expected.set(2, 23);

    const actual =
      expensesComputation.computeTotalExpensesPerCategory(expensesHistory);

    expect(actual).toStrictEqual(expected);
  });
});
