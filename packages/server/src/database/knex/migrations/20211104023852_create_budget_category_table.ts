import { BUDGET_TYPES, USERS } from '../../constants/tables';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(BUDGET_TYPES, table => {
    table
      .increments('budget_type_id')
      .notNullable()
      .unsigned()
      .primary()
      .unique()
      .defaultTo(0);
    table.string('type').notNullable();
    table.text('description').nullable();

    table.integer('user_id').notNullable();

    table
      .foreign('user_id')
      .references('user_id')
      .inTable(USERS)
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(BUDGET_TYPES);
}
