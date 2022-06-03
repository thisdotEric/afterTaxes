import { Knex } from 'knex';
import { DbNames, ReferenceOptions } from '../../constants/db.constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    DbNames.EXPENSES,
    (table: Knex.TableBuilder) => {
      table
        .increments('expenses_id')
        .primary()
        .notNullable()
        .unique()
        .defaultTo(0);
      table.float('amount').notNullable();
      table.string('name').notNullable();
      table.text('description').nullable();
      table.date('date').notNullable();
      table.integer('budget_id').unsigned();

      table
        .foreign('budget_id')
        .references('budget_id')
        .inTable(DbNames.BUDGET)
        .onDelete(ReferenceOptions.CASCADE);

      table.timestamps(true, true);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbNames.EXPENSES);
}
