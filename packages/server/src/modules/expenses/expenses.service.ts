import { ExpensesRepository } from '@modules/expenses';
import { Service } from 'fastify-decorators';
import { ExpensesHistory } from './expenses.repository';

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
}
