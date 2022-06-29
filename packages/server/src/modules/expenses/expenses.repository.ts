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

type ExpensesHistoryV2 = ExpensesHistory & {
  originatingBudgetDeleted?: boolean;
};

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

  async updateExpenseItem(
    user_id: number,
    { name, amount, description, id }: Omit<ExpensesHistory, 'budgetName'>
  ) {
    await this.knex
      .db()(EXPENSES)
      .update({
        name,
        amount,
        description,
      })
      .where({ user_id, expenses_id: id });
  }

  async getSingleExpenseItem(
    user_id: number,
    expenses_id: number
  ): Promise<ExpensesHistory> {
    const expenseItem_row = (
      await this.knex
        .db()(EXPENSES)
        .where({ user_id, expenses_id })
        .select('*')
        .limit(1)
    )[0];

    const expenseItem: ExpensesHistory = {
      id: expenseItem_row.expenses_id,
      name: expenseItem_row.name,
      date: new Date(expenseItem_row.updated_at),
      amount: expenseItem_row.amount,
      description: expenseItem_row.description,
      budget_id: expenseItem_row.categorized_budget_id,
      budgetName: expenseItem_row.cbName,
    };

    return expenseItem;
  }

  async deleteExpensesItem(user_id: number, expenses_id: number) {
    await this.knex.db()(EXPENSES).where({ user_id, expenses_id }).delete();
  }

  async getAllExpenses(
    user_id: number,
    month: number,
    year: number
  ): Promise<ExpensesHistoryV2[]> {
    try {
      const allExpenses_row = await this.knex
        .db()(EXPENSES)
        .joinRaw(
          `join ${CATEGORIZED_BUDGET} cb on expenses.categorized_budget_id = cb.categorized_budget_id`
        )
        .where(`${EXPENSES}.user_id`, user_id)
        .whereRaw(`EXTRACT(month from ${EXPENSES}.created_at) = '${month}'`)
        .andWhereRaw(`EXTRACT(year from ${EXPENSES}.created_at) = '${year}'`)
        .orderByRaw(`${EXPENSES}.updated_at desc`)
        .select('*', 'expenses.name', 'cb.name as cbName');

      const allExpenses: ExpensesHistoryV2[] = allExpenses_row.map((r: any) => {
        return {
          id: r.expenses_id,
          name: r.name,
          date: new Date(r.updated_at),
          amount: r.amount,
          description: r.description,
          budget_id: r.categorized_budget_id,
          budgetName: r.cbName,
          originatingBudgetDeleted: r.deleted,
        };
      });

      return allExpenses;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getAllExpensesByID(
    categorized_budget_id: number
  ): Promise<ExpensesHistory[]> {
    const expenses = await this.knex.db()(EXPENSES).where({
      categorized_budget_id,
    });

    return expenses;
  }
}
