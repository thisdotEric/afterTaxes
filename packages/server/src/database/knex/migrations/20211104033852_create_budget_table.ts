import { Knex } from 'knex';
import { DbNames } from '../../constants';
import { BUDGET_TYPES } from '../../constants/budgets';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbNames.BUDGET, (table: Knex.TableBuilder) => {
    table.increments('budget_id').notNullable().unique().primary().defaultTo(0);
    table.enum('budget_type', Object.values(BUDGET_TYPES)).defaultTo('daily');
    table.string('budget_name').notNullable();
    table.float('budget').unsigned();
    table.date('date_budgeted').notNullable();
    table.date('from').notNullable();
    table.date('to').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbNames.BUDGET);
}
