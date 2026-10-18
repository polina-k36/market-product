import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtTokensService } from '../../jwt-tokens/jwt-tokens.service.js';

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtTokensService: JwtTokensService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) return true;
    try {
      const payload = this.jwtTokensService.verifyAccessToken(token);
      req.user = payload;
    } catch (e) {
      return true;
    }
    return true;
  }

  private extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
