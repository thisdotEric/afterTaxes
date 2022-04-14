import { Service } from 'typedi';
import BudgetRepository, { IBudget } from './budget.repository';

@Service()
class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async sdfsd(budget: IBudget[]) {
    await this.budgetRepository.add(budget);
  }
}

export default BudgetService;
