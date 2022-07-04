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
    const budget_types = await this.knex
      .db()(BUDGET_TYPES)
      .where({ user_id, deleted: false });

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

  async deleteBudgetCategory(user_id: number, category_id: number) {
    await this.knex
      .db()(BUDGET_TYPES)
      .update({
        deleted: true,
      })
      .where({
        user_id,
        budget_type_id: category_id,
      });
  }

  async getBudgetTypeName(category_id: number): Promise<string> {
    const row = await this.knex
      .db()(BUDGET_TYPES)
      .where({
        budget_type_id: category_id,
      })
      .select('type')
      .limit(1);

    return row[0].type as string;
  }
}
