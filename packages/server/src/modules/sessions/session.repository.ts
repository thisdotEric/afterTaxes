import KnexQueryBuilder from '@database/knex/knexDatabase';
import { USERS } from '@database/constants';
import { Service } from 'fastify-decorators';
import { verifyPassword } from '@utils/auth';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface User {
  email: string;
  fullname: string;
}

@Service()
export class SessionRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async login({
    email,
    password: userPassword,
  }: LoginDetails): Promise<User | null> {
    /**
     * Get the hashed password and password salt
     * which will be used to verify the supplied user password
     */
    const saved_password_info = (
      await this.knex
        .db()(USERS)
        .where({ email })
        .select('password_salt', 'password')
        .limit(1)
    )[0];

    // Verify if the password matches
    const valid = await verifyPassword(
      userPassword,
      saved_password_info.password,
      saved_password_info.password_salt
    );

    if (valid) {
      const user = (
        await this.knex
          .db()(USERS)
          .select('first_name', 'middle_name', 'last_name', 'email')
          .where({ email })
          .limit(1)
      )[0];

      /**
       * Get the currently logged in user
       */
      const current_user: User = {
        email: user.email,
        fullname: `${user.first_name} ${user.middle_name} ${user.last_name}`,
      };

      return current_user;
    }

    return null;
  }
}
