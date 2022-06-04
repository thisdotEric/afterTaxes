import { Knex } from 'knex';
import { DbNames } from '../../constants';
import { hashPassword, PersistedPassword } from '../../../utils/auth/';

export async function seed(knex: Knex): Promise<void> {
  await knex(DbNames.USERS).del();

  const password: PersistedPassword = await hashPassword('password');

  // Insert a test user
  await knex(DbNames.USERS).insert([
    {
      user_id: 1,
      first_name: 'Jason',
      middle_name: 'Nathan',
      last_name: 'Conte',
      email: 'jason.conte@gmail.com',
      password: password.hashedPassword,
      password_salt: password.salt,
    },
  ]);
}
