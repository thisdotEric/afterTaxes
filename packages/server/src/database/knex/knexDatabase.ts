import { Knex, knex } from 'knex';
import config from './knexfile';
import IDatabase from '../IDatabase';
import { Service } from 'fastify-decorators';

@Service()
export default class KnexQueryBuilder implements IDatabase<Knex> {
  private readonly database: Knex;

  constructor() {
    this.database = knex(config[`${process.env.NODE_ENV}`]);
  }

  public db(): Knex {
    return this.database;
  }
}
