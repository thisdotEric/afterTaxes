import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { LogAccess } from '@middlewares';
import { Service } from 'typedi';

@Service()
@Resolver()
export class MeResolver {
    @Query(() => String)
    @UseMiddleware(LogAccess)
    async me() {
        return 'John Eric Siguenza';
    }
}
