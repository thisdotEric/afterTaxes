import { Resolver, Query, UseMiddleware } from 'type-graphql';
import LogAccess from '../../middlewares/logger.middleware';
import { injectable } from 'inversify';

@injectable()
@Resolver()
export class MeResolver {
    @Query(() => String)
    @UseMiddleware(LogAccess)
    async me() {
        return "Hello, I'm John Eric Siguenza";
    }
}
