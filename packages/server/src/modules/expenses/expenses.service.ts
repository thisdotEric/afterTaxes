import { ExpensesRepository, IExpenses } from '@modules/expenses';
import { Service } from 'fastify-decorators';

@Service()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async add(entity: IExpenses) {
    return this.expensesRepository.add(entity);
  }

  async getAllExpenses(user_id: number, month: number, year: number) {
    return this.expensesRepository.getAllExpenses(user_id, month, year);
  }
}
