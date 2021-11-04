import { Knex } from 'knex';
import { DbNames, months, BudgetType } from '../../constants';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        DbNames.BUDGET,
        (table: Knex.TableBuilder) => {
            table.uuid('budget_id').notNullable().unique().primary();
            table.string('description').nullable();
            table.float('budget').unsigned();
            table.integer('year').notNullable();
            table.enum('month', months).defaultTo(1);
            table.integer('date').nullable();
            table
                .enum('budget_type', Object.values(BudgetType))
                .defaultTo('daily');
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbNames.BUDGET);
}
