import { Service } from 'fastify-decorators';

@Service()
export class SessionService {
  async login() {
    console.log('Logging in');
  }
}
