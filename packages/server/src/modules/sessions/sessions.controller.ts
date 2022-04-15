import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginInput } from 'routes/v1/sessions/sessions.schema';
import { injectable } from 'tsyringe';
import SessionService from './session.service';

@injectable()
export default class SessionsController {
  constructor(private readonly sessionService: SessionService) {}

  async login(
    request: FastifyRequest<{
      Body: LoginInput;
    }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;

    await this.sessionService.login();

    console.log(email, password);

    reply.send({
      email,
      user_id: 1,
    });
  }

  async tr(
    request: FastifyRequest<{
      Body: LoginInput;
    }>,
    reply: FastifyReply
  ) {
    await this.sessionService.login();

    reply.send('{');
  }
}
