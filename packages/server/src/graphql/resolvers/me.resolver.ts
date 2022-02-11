import { Resolver, Query } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class MeResolver {
  @Query(() => String)
  async me() {
    return 'John Eric Siguenza';
  }
}
