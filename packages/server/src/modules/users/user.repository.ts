import KnexQueryBuilder from '@database/knex/knexDatabase';
import { DbNames } from '@database/constants';
import { IUser } from '@entity';
import { BaseRepository } from '@interfaces/repositories';
import { Service } from 'fastify-decorators';

@Service()
export default class UserRepository implements BaseRepository<IUser, number> {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(entity: IUser): Promise<boolean> {
    return entity !== null;
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
