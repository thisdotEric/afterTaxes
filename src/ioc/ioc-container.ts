// import {
//   getGoogleAuthenticationObject,
//   GoogleAuthObject,
// } from '@authentication';
import KnexQueryBuilder from '@database/knex/knexDatabase';
import { Knex } from 'knex';
import { Container } from 'typedi';
//import TYPES from './bindings';

// Create the Google authentication object
(async () => {
  // Container.set<GoogleAuthObject>(
  //   TYPES.GoogleAuthObject,
  //   await getGoogleAuthenticationObject()
  // );

  Container.set<Knex.Transaction>(
    'KnexTransaction',
    await new KnexQueryBuilder().getDbInstance().transaction()
  );
})();

export default Container;
