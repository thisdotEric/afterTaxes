import { AppContext } from '@types';
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { LoginInput } from '../../graphql/inputs';

@ObjectType()
class LoggedInUser {
  @Field()
  email: string;

  @Field()
  fullname: string;
}

@Service()
@Resolver()
export default class AuthenticationResolver {
  @Mutation(() => LoggedInUser, {
    description:
      'Login Resolver, requires email and password. Returns a session cookie',
  })
  async login(
    @Ctx() { req }: AppContext,
    @Arg('input') { email, password }: LoginInput
  ): Promise<LoggedInUser> {
    console.log(email, password);

    const user = {
      email,
      fullname: 'John Eric Siguenza',
    };

    req.session.user = user;

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req }: AppContext): Promise<boolean> {
    console.log(req.session.user);

    req.session.user = null;
    return true;
  }
}
