import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import AppContext from '../types/AppContext';
import { Service } from 'typedi';

@Service()
export default class LogAccess implements MiddlewareInterface<AppContext> {
    async use({ context: { req } }: ResolverData<AppContext>, next: NextFn) {
        console.log('Logger Middleware', req.body);

        return next();
    }
}
