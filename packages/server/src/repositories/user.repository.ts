import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Service } from 'typedi';
import { DbNames } from '@database/constants';
import { IUser } from '@entity';
import { BaseRepository } from './base/base.repository';

@Service()
export class UserRepository implements BaseRepository<IUser, string> {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(entity: IUser): Promise<boolean> {
    return entity !== null;
  }

  async getById(user_id: string): Promise<IUser | null> {
    const user = await this.knex
      .db()(DbNames.USERS)
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

    if (!user) return null;

    return user;
  }
}
