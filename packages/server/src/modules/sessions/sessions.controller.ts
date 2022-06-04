import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, POST } from 'fastify-decorators';
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
      return reply.code(200).send(user);
    } else return reply.code(401).send('Logged in failed');
  }
}
