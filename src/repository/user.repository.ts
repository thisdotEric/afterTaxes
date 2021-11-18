import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Inject, Service } from 'typedi';
import { DbNames } from '@database/constants';
import { IUser } from '@entity';

@Service()
export class UserRepository {
  constructor(@Inject('knex') private readonly db: KnexQueryBuilder) {}

  async getUser(email: string): Promise<Required<IUser>> {
    const user = await this.db
      .getDbInstance()(DbNames.USERS)
      .where({ email })
      .select('user_id', 'first_name', 'middle_name', 'last_name', 'email')
      .first();

    return user;
  }
}
