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

  async getBudgets(month: number, year: number): Promise<IBudget[]> {
    const budget_rows = await this.knex
      .db()
      .raw(
        `select * from budget where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year}`
      );

    /**
     * Map the returned rows into an IBudget array
     */
    const budgets: IBudget[] = budget_rows.rows.map((r: any) => ({
      amount: r.amount,
      description: r.description,
      created_at: r.created_at,
    }));

    return budgets;
  }

  async add(budget: IBudget): Promise<void> {
    await this.knex.db()(BUDGET).insert(budget);
  }
}
