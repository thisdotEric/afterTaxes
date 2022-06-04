import { Knex } from 'knex';
import { BUDGET, CATEGORIZED_BUDGET, USERS } from '../../constants/tables';
import { BUDGET_TYPES } from '../../constants/budgets';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(BUDGET, table => {
      table
        .increments('budget_id')
        .notNullable()
        .primary()
        .defaultTo(0)
        .unique();
      table.float('amount').notNullable();
      table.text('description').nullable();

      table.timestamps(true, true);

      table.integer('user_id').notNullable().unsigned();
      table
        .foreign('user_id')
        .references('user_id')
        .inTable(USERS)
        .onDelete('CASCADE');
    })
    .createTable(CATEGORIZED_BUDGET, (table: Knex.TableBuilder) => {
      table
        .increments('categorized_budget_id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(0);
      table.enum('budget_type', Object.values(BUDGET_TYPES)).defaultTo('daily');
      table.string('name').notNullable();
      table.float('budget').unsigned();

      table.timestamps(true, true);

      table.integer('user_id').notNullable().unsigned();
      table
        .foreign('user_id')
        .references('user_id')
        .inTable(USERS)
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(BUDGET)
    .dropTableIfExists(CATEGORIZED_BUDGET);
}
