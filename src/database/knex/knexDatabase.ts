import 'reflect-metadata';
import { Knex, knex } from 'knex';
import config from './knexfile';
import IDatabase from '../IDatabase';
import { injectable } from 'inversify';

@injectable()
export default class KnexQueryBuilder implements IDatabase<Knex> {
    private readonly db: Knex;

    constructor() {
        this.db = knex(config[`${process.env.NODE_ENV}`]);
    }

    public getDbInstance(): Knex {
        return this.db;
    }
}
