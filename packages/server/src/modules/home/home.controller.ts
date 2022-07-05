import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';

@Controller('/')
export class HomeController {
  constructor() {}

  @GET('/')
  async login(_request: FastifyRequest, reply: FastifyReply) {
    reply.send('Ok');
  }
}
