import { BUDGET } from '@database/constants';
import { BUDGET_TYPES } from '@database/constants/budgets';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'typedi';

export interface IBudget {
  name: string;
  description?: string;
  budget_type: keyof typeof BUDGET_TYPES | string;
  budget: number;
  date_budgeted: Date;
  budgetFrom: Date;
  budgetUntil: Date;
}

@Service()
export default class BudgetRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(budgets: IBudget[]) {
    await this.knex
      .db()(BUDGET)
      .insert(
        budgets.map(budget => ({
          budget_type: budget.budget_type,
          budget_name: budget.name,
          budget: budget.budget,
          date_budgeted: budget.date_budgeted,
          budgetFrom: budget.budgetFrom,
          budgetTo: budget.budgetUntil,
        }))
      );
  }
}
