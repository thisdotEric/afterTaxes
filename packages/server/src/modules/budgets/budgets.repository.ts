import { BUDGET, CATEGORIZED_BUDGET } from '@database/constants';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'fastify-decorators';

// budget_type: keyof typeof BUDGET_TYPES | string;

export interface IBudget {
  amount: number;
  description?: string;
  created_at?: Date;
}

export interface CategorizedBudget {
  id: number;
  category: string;
  name: string;
  budget: number;
}

@Service()
export class BudgetsRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async getBudgets(month: number, year: number): Promise<IBudget[]> {
    const budget_rows = await this.knex
      .db()
      .raw(
        `select * from ${BUDGET} where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year}`
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

  async getCategorizedBudgets(
    month: number,
    year: number
  ): Promise<CategorizedBudget[]> {
    const budget_rows = await this.knex
      .db()
      .raw(
        `select * from ${CATEGORIZED_BUDGET} where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year}`
      );

    /**
     * Map the returned rows into an IBudget array
     */
    const categorized_budgets: CategorizedBudget[] = budget_rows.rows.map(
      (r: any) => ({
        id: r.categorized_budget_id,
        category: r.budget_type,
        name: r.name,
        budget: r.budget,
      })
    );

    return categorized_budgets;
  }
}
