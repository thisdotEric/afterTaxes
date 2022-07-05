import { IUser } from '@entity';
import { UserNotFoundException } from '@exceptions';
import { UserRepository } from '@modules/users';
import { Service } from 'fastify-decorators';
import { SignupUser } from './user.repository';

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get a user by id
   * @param {string} user_id - The user_id of the user
   * @returns {Promise<IUser>} user - Returned user
   */
  async getById(user_id: number): Promise<IUser> {
    const user = await this.userRepository.getById(user_id);

    if (!user) throw new UserNotFoundException();

    return user;
  }

  async signUp(user: SignupUser): Promise<boolean> {
    return this.userRepository.add(user);
  }
}
