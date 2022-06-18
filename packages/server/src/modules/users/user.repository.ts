import KnexQueryBuilder from '@database/knex/knexDatabase';
import { DbNames, USERS } from '@database/constants';
import { IUser } from '@entity';
import { BaseRepository } from '@interfaces/repositories';
import { Service } from 'fastify-decorators';
import { hashPassword, PersistedPassword } from '@utils/auth';

export type SignupUser = IUser & { password: string };

@Service()
export default class UserRepository
  implements BaseRepository<SignupUser, number>
{
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(entity: SignupUser): Promise<boolean> {
    const password: PersistedPassword = await hashPassword(entity.password);

    await this.knex
      .db()(USERS)
      .insert({
        ...entity,
        password: password.hashedPassword,
        password_salt: password.salt,
      });

    return true;
  }

  async getById(user_id: number): Promise<IUser | null> {
    const user = await this.knex
      .db()(DbNames.USERS)
      .where({
        user_id,
      })
      .select<IUser>(
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'email'
      )
      .first();

    if (!user) return null;

    return user;
  }
}
