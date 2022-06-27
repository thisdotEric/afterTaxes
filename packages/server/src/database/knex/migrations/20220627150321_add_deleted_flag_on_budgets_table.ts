import { Knex } from 'knex';
import { CATEGORIZED_BUDGET } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(CATEGORIZED_BUDGET, table => {
    table.boolean('deleted').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(CATEGORIZED_BUDGET, table => {
    table.dropColumn('deleted');
  });
}
