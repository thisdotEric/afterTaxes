import { Knex } from 'knex';
import { DbNames } from '../../constants/db.constants';
import KnexQueryBuilder from '../knexDatabase';

const db = new KnexQueryBuilder();

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([knex(DbNames.BUDGET).del(), knex(DbNames.EXPENSES).del()]);
}
