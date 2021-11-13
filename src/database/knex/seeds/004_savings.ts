import { Knex } from 'knex';
import { DbNames } from '../../constants';

export async function seed(knex: Knex): Promise<void> {
    await knex(DbNames.SAVINGS).del();

    await knex(DbNames.SAVINGS).insert([
        {
            name: 'CIMB-Emergency Fund',
            description:
                'Emergency fund savings that will last for approximately six (6) months.',
            bank: 'CIMB',
            date_opened: '2021-11-12',
            goal_amount: 100000.0,
        },
    ]);
}
