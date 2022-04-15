import { FastifyReply, FastifyRequest } from 'fastify';
import { GET, Service } from 'fastify-decorators';
import { SessionService } from './session.service';

@Service()
export class SessionsController {
  constructor(private readonly sessionsService: SessionService) {}

  @GET('/')
  async login(request: FastifyRequest, reply: FastifyReply) {
    await this.sessionsService.login();
    return reply.code(200).send(request.body);
  }
}
