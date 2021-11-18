import { Request } from 'express';

export default interface AppContext {
  req: Request;
}
