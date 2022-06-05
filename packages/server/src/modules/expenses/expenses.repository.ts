import KnexQueryBuilder from '@database/knex/knexDatabase';
import { CATEGORIZED_BUDGET, EXPENSES } from '@database/constants';
import { Service } from 'fastify-decorators';
import { ExpensesHistory } from '@aftertaxes/commons';

export interface IExpenses {
  name: string;
  description: string;
  amount: number;
  date: Date;
}

@Service()
export class ExpensesRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async addNewExpenses(
    user_id: number,
    {
      name,
      amount,
      budget_id,
      description,
      date,
    }: Omit<ExpensesHistory, 'id' | 'budgetName'>
  ): Promise<void> {
    await this.knex
      .db()(EXPENSES)
      .insert({
        name,
        amount,
        description,
        created_at: date ? date : new Date(),
        categorized_budget_id: budget_id,
        user_id,
      });
  }

  async getAllExpenses(
    user_id: number,
    month: number,
    year: number
  ): Promise<ExpensesHistory[]> {
    try {
      const allExpenses_row = await this.knex
        .db()(EXPENSES)
        .joinRaw(
          `join ${CATEGORIZED_BUDGET} cb on expenses.categorized_budget_id = cb.categorized_budget_id`
        )
        .where(`${EXPENSES}.user_id`, user_id)
        .whereRaw(`EXTRACT(month from ${EXPENSES}.created_at) = '${month}'`)
        .andWhereRaw(`EXTRACT(year from ${EXPENSES}.created_at) = '${year}'`)
        .orderByRaw(`${EXPENSES}.created_at desc`)
        .select('*', 'expenses.name', 'cb.name as cbName');

      const allExpenses: ExpensesHistory[] = allExpenses_row.map((r: any) => {
        return {
          id: r.expenses_id,
          name: r.name,
          date: new Date(r.created_at),
          amount: r.amount,
          description: r.description,
          budget_id: r.budget_type_id,
          budgetName: r.cbName,
        };
      });

      return allExpenses;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
