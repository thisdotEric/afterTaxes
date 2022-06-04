import KnexQueryBuilder from '@database/knex/knexDatabase';
import { EXPENSES } from '@database/constants';
import { Service } from 'fastify-decorators';

export interface IExpenses {
  name: string;
  description: string;
  amount: number;
  date: Date;
}

@Service()
export class ExpensesRepository {
  constructor(private readonly knex: KnexQueryBuilder) {}

  async add(entity: IExpenses): Promise<boolean> {
    await this.knex
      .db()(EXPENSES)
      .insert({
        ...entity,
        savings_id: 1,
      });

    return true;
  }
}
