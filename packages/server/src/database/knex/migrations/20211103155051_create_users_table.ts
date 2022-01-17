import { Knex } from 'knex';
import { DbNames, ReferenceOptions, months } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(DbNames.USERS, (table: Knex.TableBuilder) => {
      table.uuid('user_id').notNullable().unique().primary();
      table.string('first_name').notNullable();
      table.string('middle_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.text('password').notNullable();
      table.text('password_salt').notNullable();
    })
    .createTable(DbNames.JOBS, (table: Knex.TableBuilder) => {
      table.uuid('user_id');
      table.string('job_name');
      table.string('company');
      table.string('description').nullable();
      table.enum('start_month', months).defaultTo(1);
      table.enum('end_month', months).defaultTo(1);
      table.integer('start_year').unsigned();
      table.integer('end_year').unsigned();

      table
        .foreign('user_id')
        .references('user_id')
        .inTable(DbNames.USERS)
        .onDelete(ReferenceOptions.CASCADE);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(DbNames.JOBS)
    .dropTableIfExists(DbNames.USERS);
}
