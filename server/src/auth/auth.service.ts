import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { SessionsService } from '../sessions/sessions.service.js';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from './constants/auth.constants.js';
import { OAuth2Client } from 'google-auth-library';
import { UserIdentitiesService } from '../user-identities/user-identities.service.js';
import { AuthProviderEnum } from '../user-identities/enums/auth-provider.enum.js';
import { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly userIdentitiesService: UserIdentitiesService,
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

  async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');

    const isValidPass = await bcrypt.compare(
      userDto.password,
      user.passwordHash,
    );
    if (!isValidPass) throw new UnauthorizedException('Invalid credentials');

    const { passwordHash, ...validUser } = user;

    return validUser;
  }

  async login(userDto: LoginUserDto) {
    const validUser = await this.validateUser(userDto);

    const accessToken = this.createAccessJwtToken({
      id: validUser.id,
      role: validUser.role.title,
      emailVerified: validUser.emailVerified,
    });
    const refreshToken = await this.createRefreshJwtToken({
      id: validUser.id,
    });

    return {
      success: true,
      accessToken,
      refreshToken,
      data: validUser,
    };
  }

  async register(userDto: CreateUserDto) {
    const createdUser = await this.usersService.create(userDto);

    const accessToken = this.createAccessJwtToken({
      id: createdUser.id,
      role: createdUser.role.title,
      emailVerified: createdUser.emailVerified,
    });
    const refreshToken = await this.createRefreshJwtToken({
      id: createdUser.id,
    });

    return {
      success: true,
      accessToken,
      refreshToken,
      data: createdUser,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is missing.');

    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const session = await this.sessionsService.getSessionById(
      payload.sessionId,
      payload.sub,
    );
    const validToken = await bcrypt.compare(
      refreshToken,
      session.tokenHash ?? '',
    );

    if (!validToken)
      throw new UnauthorizedException('Refresh token is missing.');

    if (new Date() > session.expiresAt) {
      await this.sessionsService.remove(payload.sessionId, payload.sub);
      throw new UnauthorizedException('Refresh token is missing.');
    }

    const user = await this.usersService.getUserById(payload.sub);

    if (!user) throw new UnauthorizedException('Invalid refresh token.');

    const accessToken = this.createAccessJwtToken({
      id: payload.sub,
      role: user.role.title,
      emailVerified: user.emailVerified,
    });

    return {
      accessToken,
      data: {
        id: payload.sub,
      },
    };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) return;

    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      return;
    }
    await this.sessionsService.remove(payload.sessionId, payload.sub);
  }

  async profile(userId: number) {
    const user = await this.usersService.getUserById(userId);
    console.log(userId);
    if (!user) throw new NotFoundException();
    return user;
  }

  async google(credential: string) {
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload)
      throw new UnauthorizedException('Google authentication data is missing.');

    if (!payload.sub)
      throw new UnauthorizedException('Google account identifier is missing.');

    if (!payload.email)
      throw new UnauthorizedException('Google account email is missing.');

    if (!payload.email_verified)
      throw new UnauthorizedException('Google account email is not verified.');

    const userIdentity = await this.userIdentitiesService.getIdentity(
      AuthProviderEnum.GOOGLE,
      payload.sub,
    );

    let user;

    if (!userIdentity) {
      user = await this.usersService.getUserByLogin(payload.email);
      if (!user) {
        user = await this.registerUserWithProvider(
          {
            name: payload.name ?? 'no-name',
            email: payload.email,
            emailVerified: payload.email_verified,
            urlAvatar: payload.picture,
          },
          AuthProviderEnum.GOOGLE,
          payload.sub,
        );
      } else {
        if (!user.emailVerified) {
          throw new UnauthorizedException(
            'This email is already associated with an unverified account. Please verify your email before linking Google.',
          );
        }

        await this.userIdentitiesService.create({
          userId: user.id,
          provider: AuthProviderEnum.GOOGLE,
          providerAccountId: payload.sub,
        });
      }
    } else {
      user = userIdentity.user;
    }

    const accessToken = this.createAccessJwtToken({
      id: user.id,
      role: user.role.title,
      emailVerified: user.emailVerified,
    });
    const refreshToken = await this.createRefreshJwtToken({
      id: user.id,
    });

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  async registerUserWithProvider(
    dtoUser: CreateUserDto,
    provider: AuthProviderEnum,
    providerAccountId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const user = await this.usersService.create(dtoUser, tx);
      await this.userIdentitiesService.create(
        {
          userId: user.id,
          provider,
          providerAccountId,
        },
        tx,
      );
      return user;
    });
  }
}
