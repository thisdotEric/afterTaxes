import { BUDGET_TYPES } from '@database/constants';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'fastify-decorators';

@Service()
export class BudgetTypesRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async getAllBudgetTypes(user_id: number) {
    const budget_types = await this.knex.db()(BUDGET_TYPES).where({ user_id });

    return budget_types;
  }
}
