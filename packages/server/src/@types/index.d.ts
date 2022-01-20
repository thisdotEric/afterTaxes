import * as fastify from 'fastify';

declare module 'fastify' {
  interface User {
    email: string;
    fullname: string;
  }

  export interface Session extends Record<string, any> {
    user: User | null;
  }
}
