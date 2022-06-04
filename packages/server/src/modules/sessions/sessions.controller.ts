import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, POST } from 'fastify-decorators';
import { SessionService } from './session.service';

@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionService) {}

  @POST('/')
  async login(
    request: FastifyRequest<{
      Body: {
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;

    const user = await this.sessionsService.login({ email, password });

    if (user) {
      /**
       * Store the current user to the session object
       */
      request.session.user = user;

      return reply.code(200).send(user);
    } else return reply.code(401).send('Logged in failed');
  }

  @DELETE('/')
  async logout(request: FastifyRequest, reply: FastifyReply) {
    request.session.destroy(() => {});
    request.session.user = null;

    return reply.code(200).send('Logged out');
  }
}
