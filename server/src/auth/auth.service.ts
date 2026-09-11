import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SessionsService } from '../sessions/sessions.service.js';
import { OAuth2Client } from 'google-auth-library';
import { UserIdentitiesService } from '../user-identities/user-identities.service.js';
import { AuthProviderEnum } from '../user-identities/enums/auth-provider.enum.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterUserDto } from '../users/dto/register-user.dto.js';
import { isEmail, isPhoneNumber } from 'class-validator';
import { ICreateDataUser } from '../users/interfaces/create-data-user.interface.js';
import { CreateUserFromProviderDto } from '../users/dto/create-user-from-provider.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { MailService } from '../mail/mail.service.js';
import { VerificationType } from '../verifications/enums/verification-type.enum.js';
import { VerificationMethod } from '../verifications/enums/verification-method.enum.js';
import { JwtTokensService } from '../jwt-tokens/jwt-tokens.service.js';
import { VerificationsService } from '../verifications/verifications.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly verificationsService: VerificationsService,
    private readonly userIdentitiesService: UserIdentitiesService,
    private readonly mailService: MailService,
    private readonly jwtTokensService: JwtTokensService,
  ) {}

  async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');

    if (user.isBanned)
      throw new ForbiddenException('Your account has been banned.');

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

    const accessToken = this.jwtTokensService.createAccessJwtToken({
      id: validUser.id,
      role: validUser.role.title,
      emailVerified: validUser.emailVerified,
    });
    const refreshToken = await this.jwtTokensService.createRefreshJwtToken({
      id: validUser.id,
    });

    return {
      success: true,
      accessToken,
      refreshToken,
      data: validUser,
    };
  }

  async register(userDto: RegisterUserDto) {
    const createData: ICreateDataUser = {
      name: userDto.name,
      password: userDto.password,
    };
    if (isEmail(userDto.login)) {
      createData.email = userDto.login;
    } else if (isPhoneNumber(userDto.login, 'RU')) {
      createData.phone = userDto.login;
    }
    const createdUser = await this.usersService.create(createData);

    const accessToken = this.jwtTokensService.createAccessJwtToken({
      id: createdUser.id,
      role: createdUser.role.title,
      emailVerified: createdUser.emailVerified,
    });
    const refreshToken = await this.jwtTokensService.createRefreshJwtToken({
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
    if (user.isBanned)
      throw new ForbiddenException('Your account has been banned.');

    const accessToken = this.jwtTokensService.createAccessJwtToken({
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
        if (user.isBanned)
          throw new ForbiddenException('Your account has been banned.');

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
      if (user.isBanned)
        throw new ForbiddenException('Your account has been banned.');
    }

    const accessToken = this.jwtTokensService.createAccessJwtToken({
      id: user.id,
      role: user.role.title,
      emailVerified: user.emailVerified,
    });
    const refreshToken = await this.jwtTokensService.createRefreshJwtToken({
      id: user.id,
    });

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  async registerUserWithProvider(
    dtoUser: CreateUserFromProviderDto,
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

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.getUserByLogin(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException('Email is not verified');
    }

    const code = crypto.randomInt(100000, 1000000);

    const codeHash = await bcrypt.hash(code.toString(), 10);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    const sendEmail = await this.mailService.sendEmail({
      recipient: email,
      subject: `Восстановление пароля на сайте ${process.env.BASE_URL_CLIENT}`,
      html: this.getPasswordResetCodeTemplate(code.toString()),
    });

    if (!sendEmail.success) {
      throw new InternalServerErrorException(
        'Failed to send password reset code',
      );
    }

    const verification = await this.verificationsService.upsert({
      valueHash: codeHash,
      expiresAt,
      method: VerificationMethod.CODE,
      userId: user.id,
      type: VerificationType.PASSWORD_RESET,
    });

    return {
      success: true,
      verificationId: verification.id,
      message:
        'The password reset code has been sent to your email. To continue, send the verificationId and code to the verification endpoint.',
    };
  }

  async verifyResetCode(verifyData: VerifyResetCodeDto) {
    const { verificationId, code } = verifyData;

    const verification =
      await this.verificationsService.getVerificationByIdAndType(
        verificationId,
        VerificationType.PASSWORD_RESET,
      );

    if (!verification)
      throw new UnauthorizedException('Reset token not found.');

    if (verification.expiresAt < new Date())
      throw new UnauthorizedException('Reset token has expired.');

    const isValidCode = await bcrypt.compare(
      code,
      verification.valueHash ?? '',
    );
    if (!isValidCode) throw new UnauthorizedException('Invalid reset code.');

    const token = crypto.randomBytes(16).toString('hex');

    await this.verificationsService.completePasswordResetVerification(
      verificationId,
      await bcrypt.hash(token, 10),
    );

    return {
      success: true,
      verificationId: verification.id,
      resetToken: token,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { newPassword, confirmPassword, resetToken, verificationId } =
      resetPasswordDto;

    const validToken = await this.verificationsService.verifyResetToken(
      verificationId,
      resetToken,
    );

    if (!validToken.success)
      throw new UnauthorizedException('Invalid reset token.');

    return this.prisma.$transaction(async (tx) => {
      const user = await this.usersService.resetPassword(
        validToken.userId,
        newPassword,
        confirmPassword,
        tx,
      );
      await this.verificationsService.remove(verificationId, tx);
      return user;
    });
  }

  getPasswordResetCodeTemplate(code: string) {
    return `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background-color: #f5f7fb;
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
    ">
      <div style="
        max-width: 520px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 18px;
        padding: 40px 32px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        text-align: center;
      ">
        <div style="
          display: inline-block;
          padding: 8px 14px;
          margin-bottom: 24px;
          border-radius: 999px;
          background-color: #eef2ff;
          color: #4f46e5;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.4px;
        ">
          Восстановление пароля
        </div>

        <h1 style="
          margin: 0 0 14px;
          font-size: 28px;
          line-height: 1.3;
          color: #111827;
        ">
          Ваш код восстановления
        </h1>

        <p style="
          margin: 0 0 28px;
          font-size: 16px;
          line-height: 1.6;
          color: #6b7280;
        ">
          Введите этот код на сайте, чтобы подтвердить запрос
          на восстановление пароля.
        </p>

        <div style="
          display: inline-block;
          padding: 18px 28px;
          margin-bottom: 28px;
          border-radius: 14px;
          background-color: #f3f4f6;
          color: #111827;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 8px;
        ">
          ${code}
        </div>

        <p style="
          margin: 0 0 10px;
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
        ">
          Код действует в течение <strong>5 минут</strong>.
        </p>

        <p style="
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: #9ca3af;
        ">
          Никому не сообщайте этот код. Если вы не запрашивали
          восстановление пароля, просто проигнорируйте это письмо.
        </p>
      </div>
    </div>
  `;
  }
}
