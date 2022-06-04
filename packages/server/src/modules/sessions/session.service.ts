import { Service } from 'fastify-decorators';
import { LoginDetails, SessionRepository, User } from './session.repository';

@Service()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async login(loginDetails: LoginDetails): Promise<User | null> {
    return this.sessionRepo.login(loginDetails);
  }
}
