import { ExpensesRepository } from '@modules/expenses';
import { Service } from 'fastify-decorators';
import { ExpensesHistory } from '@aftertaxes/commons';

@Service()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async addNewExpense(
    user_id: number,
    newExpense: Omit<ExpensesHistory, 'id' | 'budgetName'>
  ) {
    return this.expensesRepository.addNewExpenses(user_id, newExpense);
  }

  async getAllExpenses(user_id: number, month: number, year: number) {
    return this.expensesRepository.getAllExpenses(user_id, month, year);
  }

  async deleteExpensesItem(user_id: number, expenses_id: number) {
    await this.expensesRepository.deleteExpensesItem(user_id, expenses_id);
  }

  async getSingleExpenseItem(user_id: number, expenses_id: number) {
    return this.expensesRepository.getSingleExpenseItem(user_id, expenses_id);
  }

  async updateExpenseItem(
    user_id: number,
    expenseItem: Omit<ExpensesHistory, 'budgetName'>
  ) {
    return this.expensesRepository.updateExpenseItem(user_id, expenseItem);
  }
}
