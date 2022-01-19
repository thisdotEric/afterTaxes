import { Knex } from 'knex';
import { DbNames, ReferenceOptions, months } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DbNames.SALARY, (table: Knex.TableBuilder) => {
    table.uuid('user_id');
    table.float('gross').notNullable();
    table.float('net').notNullable();
    table.float('tax_amount').notNullable();
    table.enum('month', months).notNullable().defaultTo(1);
    table.integer('year').notNullable();

    table
      .foreign('user_id')
      .references('user_id')
      .inTable(DbNames.USERS)
      .onDelete(ReferenceOptions.CASCADE);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbNames.SALARY);
}
