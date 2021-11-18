import { Knex } from 'knex';
import { DbNames } from '../../constants';

const test_user_id = '8c96a9df-958a-48da-be3d-38a237d2efc7';

export async function seed(knex: Knex): Promise<void> {
  await Promise.all([knex(DbNames.SALARY).del(), knex(DbNames.JOBS).del()]);

  await Promise.all([
    knex(DbNames.SALARY).insert([
      {
        user_id: test_user_id,
        gross: 35000.0,
        net: 30000.0,
        tax_amount: 5000.0,
        month: 11,
        year: 2021,
      },
    ]),
    knex(DbNames.JOBS).insert([
      {
        user_id: test_user_id,
        job_name: 'Backend Software Engineer',
        company: 'Monzo Bank',
        description:
          'Uses NodeJS/TypeScript in developing fintech applications',
        start_month: 4,
        end_month: 12,
        start_year: 2021,
        end_year: 2021,
      },
    ]),
  ]);
}
