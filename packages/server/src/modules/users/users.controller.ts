import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';
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
}
