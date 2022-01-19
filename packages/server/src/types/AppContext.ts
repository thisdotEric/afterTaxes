import { FastifyRequest } from 'fastify';

export default interface AppContext {
  req: FastifyRequest;
}
