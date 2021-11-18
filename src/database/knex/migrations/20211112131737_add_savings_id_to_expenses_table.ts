import { Knex } from 'knex';
import { DbNames, ReferenceOptions } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    DbNames.EXPENSES,
    (table: Knex.TableBuilder) => {
      table.integer('savings_id').unsigned();

      table
        .foreign('savings_id')
        .references('savings_id')
        .inTable(DbNames.SAVINGS)
        .onDelete(ReferenceOptions.CASCADE);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    DbNames.EXPENSES,
    (table: Knex.TableBuilder) => {
      table.dropColumn('savings_id');
    }
  );
}
