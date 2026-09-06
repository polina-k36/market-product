import { Request } from 'express';
import { JwtPayload } from './jwt-payload.js';

export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};
