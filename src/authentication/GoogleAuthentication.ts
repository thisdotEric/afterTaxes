import { redis } from '@utils/redis';
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
  await redis.connect();

  const private_key = (await redis.get(process.env.REDIS_GOOGLE_PRIVATE_KEY!))!;
  const service_account_email = (await redis.get(
    process.env.REDIS_GOOGLE_SERVICE_ACCOUNT_EMAIL!
  ))!;

  await redis.quit();

  // Create the Google authentication object
  return new GoogleAuth({
    credentials: {
      private_key,
      client_email: service_account_email,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  }).getClient();
}
