import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { LogAccess } from '@middlewares';
import { Service } from 'typedi';
import { UserRepository } from 'repository/user.repository';

@Service()
@Resolver()
export class MeResolver {
  constructor(private readonly userRepo: UserRepository) {}

  @Query(() => String)
  @UseMiddleware(LogAccess)
  async me() {
    const user = await this.userRepo.getUser('jason.conte@gmail.com');

    return `${user.first_name} ${user.middle_name} ${user.last_name}`;
  }
}
