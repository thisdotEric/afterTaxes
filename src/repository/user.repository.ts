import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'typedi';
import { DbNames } from '@database/constants';
import { IUser } from '@entity';
import { BaseRepository } from './base/base.repository';
import { UserNotFoundException } from '@exceptions';

@Service()
export class UserRepository implements BaseRepository<IUser, string> {
  constructor(private readonly db: KnexQueryBuilder) {}

  async getById(user_id: string): Promise<IUser> {
    const user = await this.db
      .getDbInstance()(DbNames.USERS)
      .where({
        user_id,
      })
      .select<IUser>(
        'user_id as id',
        'first_name',
        'middle_name',
        'last_name',
        'email'
      )
      .first();

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
