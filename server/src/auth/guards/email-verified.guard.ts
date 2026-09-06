import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EMAIL_VERIFIED_KEY } from '../decorators/email-verified.decorator.js';
import { Request } from 'express';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredVerified: boolean | undefined =
      this.reflector.getAllAndOverride(EMAIL_VERIFIED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (requiredVerified === undefined) return true;

    const req: Request = context.switchToHttp().getRequest();
    const emailVerified = req.user?.emailVerified;

    if (emailVerified === requiredVerified) {
      return true;
    } else {
      throw new ForbiddenException(
        'You do not have permission to access this resource.',
      );
    }
  }
}
