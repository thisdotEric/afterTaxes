import { createClient } from 'redis';

const redis = createClient({
  // Make sure to prefix your redis URI with redis://, also don't forget to include the port number in the end
  url: process.env.REDIS_URI!,
  password: process.env.REDIS_PASSWORD!,
});

export default redis;
