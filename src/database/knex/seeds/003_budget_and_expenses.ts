import { Knex } from 'knex';
import { DbNames } from '../../constants/db.constants';
import KnexQueryBuilder from '../knexDatabase';

const db = new KnexQueryBuilder();

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([
    knex(DbNames.BUDGET).del(),
    knex(DbNames.EXPENSES).del(),
    knex(DbNames.BUDGET_NAME).del(),
  ]);

  await knex(DbNames.BUDGET_NAME).insert([
    {
      budget_name: 'Home Contribution',
      description: 'Contribution for food, LPG, water, Internet',
    },
    {
      budget_name: 'Food',
      description: 'My monthly allocation for food expenses',
    },
    {
      budget_name: 'Emergency Fund',
      description: 'Emergency Fund for future unexpected expenses',
    },
    {
      budget_name: 'Digital Ocean VPS',
      description:
        'Monthly virtual private server (VPS) subscription for hosting my income tracker application',
    },
    {
      budget_name: 'PhilHealth',
      description: 'Voluntary Philhealth contribution',
    },
    {
      budget_name: 'Transportation',
      description: 'Monthly transportation allowance',
    },
    {
      budget_name: 'Daily',
    },
  ]);

  await knex(DbNames.BUDGET).insert([
    {
      date: '2021-11-01',
      budget: 8000,
      budget_type: 'monthly',
      budget_name: 'Home Contribution',
    },
    {
      date: '2021-11-01',
      budget: 5000,
      budget_type: 'monthly',
      budget_name: 'Emergency Fund',
    },
    {
      date: '2021-11-01',
      budget: 300,
      budget_type: 'monthly',
      budget_name: 'Digital Ocean VPS',
    },
    {
      date: '2021-11-01',
      budget: 300,
      budget_type: 'monthly',
      budget_name: 'PhilHealth',
    },
    {
      date: '2021-11-01',
      budget: 600,
      budget_type: 'monthly',
      budget_name: 'Transportation',
    },
    {
      date: '2021-11-01',
      budget: 6000,
      budget_type: 'monthly',
      budget_name: 'Food',
    },
  ]);

  const dailyBudget = await db
    .getDbInstance()
    .raw(
      "select ((select net from salary where month = '11' and year = 2021) - sum(budget)) / 30 as total from budget where budget_type = 'monthly';"
    );

  const dailyBudgets = Array(30)
    .fill(undefined)
    .map((_, index) => {
      return {
        date: `2021-11-${index + 1}`,
        budget: Math.round(parseFloat(dailyBudget.rows[0].total) * 100) / 100,
        budget_type: 'daily',
        budget_name: 'Daily',
      };
    });

  await knex(DbNames.BUDGET).insert(dailyBudgets);
}
