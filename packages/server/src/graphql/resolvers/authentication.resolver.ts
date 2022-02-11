import { AppContext } from '@types';
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { LoginInput } from '@graphql/inputs';
import { ILoggedInUser } from '@aftertaxes/commons';

@ObjectType()
class LoggedInUser implements ILoggedInUser {
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

    const user: LoggedInUser = {
      email,
      fullname: 'John Eric Siguenza',
    };

    console.log(req.session);

    return user;
  }

  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    return true;
  }
}
