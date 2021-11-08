import { Knex, knex } from 'knex';
import config from './knexfile';
import IDatabase from '../IDatabase';
import { injectable } from 'inversify';

// already imported in the server.ts 
// but is needed when running knex independently inside seed funtions
import 'reflect-metadata';

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
