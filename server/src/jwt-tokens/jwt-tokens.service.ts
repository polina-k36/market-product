import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from '../auth/constants/auth.constants.js';
import { SessionsService } from '../sessions/sessions.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {}

  createAccessJwtToken(user: {
    id: number;
    role: string;
    emailVerified: boolean;
  }) {
    const payload = {
      sub: user.id,
      role: user.role,
      emailVerified: user.emailVerified,
    };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async createRefreshJwtToken(user: { id: number }) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const session = await this.sessionsService.create({
      userId: user.id,
      expiresAt,
    });

    const payload = {
      sub: user.id,
      sessionId: session.id,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_DAYS}d`,
    });

    const tokenHash = await bcrypt.hash(refreshToken, 5);
    await this.sessionsService.updateTokenHash(session.id, user.id, tokenHash);

    return refreshToken;
  }
}
