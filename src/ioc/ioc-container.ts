import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Knex } from 'knex';
import { Container } from 'typedi';
import TYPES from './bindings';

(async () => {
  Container.set<Knex.Transaction>(
    TYPES.KnexTransaction,
    await new KnexQueryBuilder().getDbInstance()
  );
})();

export default Container;
