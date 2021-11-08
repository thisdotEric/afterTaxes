import { Knex } from 'knex';
import { DbNames, ReferenceOptions } from '../../constants/db.constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(DbNames.EXPENSES, (table: Knex.TableBuilder) => {
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
            table.integer('budget_id').unsigned()

            table
                .foreign('budget_id')
                .references('budget_id')
                .inTable(DbNames.BUDGET)
                .onDelete(ReferenceOptions.CASCADE);
        })
        .createTable(DbNames.EXPENSES_RECEIPTS, (table: Knex.TableBuilder) => {
            table.integer('expenses_id').unsigned();
            table.string('receipt_name').notNullable();

            table
                .foreign('expenses_id')
                .references('expenses_id')
                .inTable(DbNames.EXPENSES)
                .onDelete(ReferenceOptions.CASCADE);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(DbNames.EXPENSES_RECEIPTS)
        .dropTableIfExists(DbNames.EXPENSES);
}
