import { createClient } from 'redis';

const redis = createClient({
  url: `redis://${process.env.REDIS_URI!}`,
  password: process.env.REDIS_PASSWORD!,
});

export default redis;
