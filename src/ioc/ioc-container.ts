import {
  getGoogleAuthenticationObject,
  GoogleAuthObject,
} from '@authentication';
import { Container } from 'typedi';
import TYPES from './bindings';

// Create the Google authentication object
(async () => {
  Container.set<GoogleAuthObject>(
    TYPES.GoogleAuthObject,
    await getGoogleAuthenticationObject()
  );
})();

export default Container;
