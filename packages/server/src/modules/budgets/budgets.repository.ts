import { BUDGET } from '@database/constants';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'fastify-decorators';

// budget_type: keyof typeof BUDGET_TYPES | string;
export interface IBudget {
  amount: number;
  description?: string;
  created_at?: Date;
}

@Service()
export class BudgetsRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(budget: IBudget) {
    await this.knex.db()(BUDGET).insert(budget);
  }
}
