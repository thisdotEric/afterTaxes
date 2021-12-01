import {
  BaseExternalAccountClient,
  Compute,
  GoogleAuth,
  Impersonated,
  JWT,
  UserRefreshClient,
} from 'google-auth-library';

export type GoogleAuthObject =
  | Compute
  | JWT
  | UserRefreshClient
  | Impersonated
  | BaseExternalAccountClient;

export default async function getGoogleAuthenticationObject(): Promise<GoogleAuthObject> {
  // Create the Google authentication object
  return new GoogleAuth({
    keyFile: __dirname + `/${process.env.GOOGLE_AUTH_JSON_FILENAME}`,
    scopes: ['https://www.googleapis.com/auth/drive'],
  }).getClient();
}
