import { BUDGET, CATEGORIZED_BUDGET, BUDGET_TYPES } from '@database/constants';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'fastify-decorators';
import { CategorizedBudget } from '@aftertaxes/commons';

export interface IBudget {
  amount: number;
  description?: string;
  created_at?: Date;
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
        `select * from ${BUDGET} where EXTRACT(MONTH FROM created_at) = ${month} and EXTRACT(YEAR FROM created_at) = ${year} and user_id = ${user_id} order by created_at desc`
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
    let sql = `select * from ${CATEGORIZED_BUDGET} cb join ${BUDGET_TYPES} bt on cb.budget_type_id = bt.budget_type_id 
    where EXTRACT(MONTH FROM cb.created_at) = ${month} and EXTRACT(YEAR FROM cb.created_at) = ${year} 
    and cb.user_id = ${user_id} and cb.deleted = false order by budget desc`;

    const budget_rows = await this.knex.db().raw(sql);

    /**
     * Map the returned rows into an IBudget array
     */
    const categorized_budgets: CategorizedBudget[] = budget_rows.rows.map(
      (r: any) => ({
        id: r.categorized_budget_id,
        budget_type_id: r.budget_type_id,
        name: r.name,
        budget: r.budget,
      })
    );

    return categorized_budgets;
  }

  async createCategorizedBudget(
    user_id: number,
    { budget, budget_type_id, name }: Omit<CategorizedBudget, 'id'>
  ) {
    await this.knex.db()(CATEGORIZED_BUDGET).insert({
      budget,
      name,
      budget_type_id,
      user_id,
    });
  }

  async getBudget(
    user_id: number,
    budget_id: number
  ): Promise<CategorizedBudget> {
    const budget = (
      await this.knex
        .db()(CATEGORIZED_BUDGET)
        .where({ user_id, categorized_budget_id: budget_id })
        .select('*')
    )[0] as CategorizedBudget;

    return budget;
  }

  async updateBudget(
    user_id: number,
    budget: number,
    budget_id: number
  ): Promise<void> {
    await this.knex
      .db()(CATEGORIZED_BUDGET)
      .update({ budget })
      .where({ user_id, categorized_budget_id: budget_id });
  }

  async deleteCategorizedBudget(user_id: number, budget_ids: number[]) {
    const deleteBudget_Promise = budget_ids.map(categorized_budget_id =>
      this.knex
        .db()(CATEGORIZED_BUDGET)
        .update({ deleted: true, budget: 0 })
        .where({ user_id, categorized_budget_id })
    );

    await Promise.all(deleteBudget_Promise);
  }
}
