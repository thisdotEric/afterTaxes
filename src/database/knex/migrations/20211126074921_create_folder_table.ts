import { DbNames } from '../../constants/db.constants';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    DbNames.GDRIVE_FOLDER,
    (table: Knex.TableBuilder) => {
      table.string('folder_name', 20).primary().notNullable().unique();
      table.string('folder_id').notNullable().unique();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DbNames.GDRIVE_FOLDER);
}
