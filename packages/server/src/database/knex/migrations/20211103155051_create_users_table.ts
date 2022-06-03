import { Knex } from 'knex';
import { USERS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USERS, (table: Knex.TableBuilder) => {
    table.increments('user_id').notNullable().unique().primary();
    table.string('first_name').notNullable();
    table.string('middle_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.text('password').notNullable();
    table.text('password_salt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(USERS);
}
