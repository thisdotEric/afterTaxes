import { BUDGET_TYPES } from '../../constants/tables';
import { Knex } from 'knex';

interface BudgetType {
  type: string;
  description?: string;
  user_id: number;
}

export async function seed(knex: Knex): Promise<void> {
  await knex(BUDGET_TYPES).del();

  const budget_types: BudgetType[] = [
    {
      type: 'FOOD',
      user_id: 1,
    },
    {
      type: 'TECH',
      user_id: 1,
    },
    {
      type: 'PERSONAL HYGIENE',
      user_id: 1,
    },
    {
      type: 'BUFFER',
      user_id: 1,
    },
    {
      type: 'SAVINGS',
      user_id: 1,
    },
  ];

  // Inserts seed entries
  await knex(BUDGET_TYPES).insert(budget_types);
}
