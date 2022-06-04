import { SESSIONS } from '../../constants/tables';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(SESSIONS, table => {
    table.text('key').primary().notNullable();
    table.json('data').notNullable();
    table.bigInteger('expiry').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(SESSIONS);
}
