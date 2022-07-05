import { CATEGORIZED_BUDGET, EXPENSES, USERS } from '../../constants';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(EXPENSES, table => {
    table
      .increments('expenses_id')
      .notNullable()
      .unsigned()
      .unique()
      .primary()
      .defaultTo(0);

    table.string('name').notNullable();
    table.float('amount').notNullable().unsigned();
    table.string('description').nullable();
    table.timestamps(true, true);

    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable(USERS)
      .onDelete('CASCADE');

    table.integer('categorized_budget_id').notNullable();
    table
      .foreign('categorized_budget_id')
      .references('categorized_budget_id')
      .inTable(CATEGORIZED_BUDGET)
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(EXPENSES);
}
