import { ExpensesRepository, IExpenses } from '@modules/expenses';
import { Service } from 'typedi';

@Service()
export default class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async add(entity: IExpenses) {
    return this.expensesRepository.add(entity);
  }
}
