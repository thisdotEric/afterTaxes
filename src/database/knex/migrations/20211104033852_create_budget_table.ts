import { Knex } from 'knex';
import { DbNames, BudgetType } from '../../constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(DbNames.BUDGET_NAME, (table: Knex.TableBuilder) => {
            table.string('budget_name').primary().notNullable().unique();
            table.string('description').nullable();
        })

        .createTable(DbNames.BUDGET, (table: Knex.TableBuilder) => {
            table
                .increments('budget_id')
                .notNullable()
                .unique()
                .primary()
                .defaultTo(0);
            table.string('budget_name').notNullable();
            table.float('budget').unsigned();
            table.date('date').notNullable();
            table
                .enum('budget_type', Object.values(BudgetType))
                .defaultTo('daily');

            table
                .foreign('budget_name')
                .references('budget_name')
                .inTable(DbNames.BUDGET_NAME);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(DbNames.BUDGET)
        .dropTableIfExists(DbNames.BUDGET_NAME);
}
