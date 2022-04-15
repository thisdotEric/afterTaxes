import { injectable } from 'tsyringe';

@injectable()
export default class SessionService {
  async login() {
    console.log('Logging in');
  }
}
