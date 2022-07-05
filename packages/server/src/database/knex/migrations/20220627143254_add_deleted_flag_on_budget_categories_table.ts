import { BUDGET_TYPES } from '../../constants/tables';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(BUDGET_TYPES, table => {
    table.boolean('deleted').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(BUDGET_TYPES, table => {
    table.dropColumn('deleted');
  });
}
