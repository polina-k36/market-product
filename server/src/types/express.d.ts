import { JwtPayload } from './jwt-payload.ts';

export {};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
