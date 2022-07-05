import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, POST } from 'fastify-decorators';
import { SignupUser } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @GET('/me')
  async me(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.session.user?.user_id;

    if (!user_id) {
      return reply.code(401).send('Unauthorized');
    } else {
      const user = await this.usersService.getById(user_id);

      return reply.code(200).send({
        email: user.email,
        fullname: `${user.first_name} ${user.middle_name} ${user.last_name}`,
      });
    }
  }

  @POST('/')
  async signup(
    request: FastifyRequest<{
      Body: SignupUser;
    }>,
    reply: FastifyReply
  ) {
    const user = request.body;

    await this.usersService.signUp(user);

    return reply.code(201).send('Ok');
  }
}
