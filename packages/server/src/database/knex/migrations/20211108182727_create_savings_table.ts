import { Knex } from 'knex';
import { DbNames, ReferenceOptions } from '../../constants/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(DbNames.SAVINGS, (table: Knex.TableBuilder) => {
      table
        .increments('savings_id')
        .unique()
        .primary()
        .unsigned()
        .defaultTo(0)
        .notNullable();
      table.string('name', 25).notNullable();
      table.string('description').nullable();
      table.string('bank').nullable();
      table
        .enum('savings_type', ['emergency_fund', 'savings'])
        .notNullable()
        .defaultTo('emergency_fund');

      table.date('date_opened').notNullable();
      table.boolean('active').defaultTo(true);
      table.float('goal_amount').nullable().unsigned();
    })
    .createTable(DbNames.SAVINGS_HISTORY, (table: Knex.TableBuilder) => {
      table
        .increments('savings_history_id')
        .primary()
        .notNullable()
        .unique()
        .unsigned()
        .defaultTo(0);
      table.float('amount').notNullable();
      table.date('date').notNullable();
      table.integer('savings_id').unsigned();

      table
        .foreign('savings_id')
        .references('savings_id')
        .inTable(DbNames.SAVINGS)
        .onDelete(ReferenceOptions.CASCADE);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(DbNames.SAVINGS_HISTORY)
    .dropTableIfExists(DbNames.SAVINGS);
}
