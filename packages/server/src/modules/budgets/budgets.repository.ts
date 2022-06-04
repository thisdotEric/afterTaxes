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

  async getBudgets(
    user_id: number,
    month: number,
    year: number
  ): Promise<IBudget[]> {
    const budget_rows = await this.knex
      .db()
      .raw(
        `select * from ${BUDGET} where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year} and user_id = ${user_id}`
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

  async add(user_id: number, budget: IBudget): Promise<void> {
    await this.knex
      .db()(BUDGET)
      .insert({ ...budget, user_id });
  }

  async getCategorizedBudgets(
    user_id: number,
    month: number,
    year: number
  ): Promise<CategorizedBudget[]> {
    const budget_rows = await this.knex
      .db()
      .raw(
        `select * from ${CATEGORIZED_BUDGET} where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year} and user_id = ${user_id} order by budget desc`
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

  async createCategorizedBudget(
    user_id: number,
    { budget, category, name }: Omit<CategorizedBudget, 'id'>
  ) {
    await this.knex.db()(CATEGORIZED_BUDGET).insert({
      budget,
      name,
      budget_type: category,
      user_id,
    });
  }
}
