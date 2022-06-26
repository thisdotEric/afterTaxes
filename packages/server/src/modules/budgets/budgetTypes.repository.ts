import { BUDGET_TYPES } from '@database/constants';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'fastify-decorators';

export interface BudgetCategory {
  name: string;
  description: string;
}

@Service()
export class BudgetTypesRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async getAllBudgetTypes(user_id: number) {
    const budget_types = await this.knex.db()(BUDGET_TYPES).where({ user_id });

    return budget_types;
  }

  async addNewBudgetCategory(
    user_id: number,
    { description, name }: BudgetCategory
  ) {
    await this.knex.db()(BUDGET_TYPES).insert({
      user_id,
      description,
      type: name,
    });
  }
}
