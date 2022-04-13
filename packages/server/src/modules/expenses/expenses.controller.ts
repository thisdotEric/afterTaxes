import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginInput } from 'routes/v1/sessions/sessions.schema';
import { Service } from 'typedi';

@Service()
export default class ExpensesController {
  async addNewExpenses(
    request: FastifyRequest<{
      Body: LoginInput;
    }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;

    console.log(email, password);

    reply.send({
      email,
      user_id: 1,
    });
  }
}
