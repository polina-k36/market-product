import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { VerificationType } from './enums/verification-type.enum.js';
import { UsersService } from '../users/users.service.js';
import { MailService } from '../mail/mail.service.js';
import { VerificationMethod } from './enums/verification-method.enum.js';
import { Prisma } from '../generated/prisma/client.js';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class VerificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  async getVerificationById(id: number, userId: number) {
    const verification = await this.prisma.verification.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!verification) throw new NotFoundException('Verification not found.');

    return verification;
  }

  async getVerificationEmailByUserId(userId: number) {
    const verification = await this.prisma.verification.findUnique({
      where: {
        userId_type: {
          userId,
          type: VerificationType.EMAIL,
        },
      },
    });

    if (!verification) throw new NotFoundException('Verification not found.');

    return verification;
  }

  upsert(verificationDto: CreateVerificationDto) {
    return this.prisma.verification.upsert({
      where: {
        userId_type: {
          userId: verificationDto.userId,
          type: verificationDto.type,
        },
      },
      update: {
        valueHash: verificationDto.valueHash,
        expiresAt: verificationDto.expiresAt,
        method: verificationDto.method,
      },
      create: verificationDto,
    });
  }

  remove(id: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.verification.deleteMany({
      where: { id },
    });
  }

  async sendEmail(userId: number, methodVerification: VerificationMethod) {
    const value =
      methodVerification === VerificationMethod.CODE
        ? crypto.randomInt(100000, 1000000).toString()
        : crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    if (methodVerification === VerificationMethod.CODE)
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    else if (methodVerification === VerificationMethod.LINK)
      expiresAt.setMinutes(expiresAt.getMinutes() + 20);

    await this.upsert({
      userId,
      type: VerificationType.EMAIL,
      valueHash: await bcrypt.hash(value, 4),
      expiresAt,
      method: methodVerification,
    });

    const contactInfo = await this.usersService.getUsersContactInfoById(userId);

    if (!contactInfo)
      throw new NotFoundException('Users contact info does not exist.');

    if (!contactInfo.email)
      throw new NotFoundException('Email does not exist.');

    const html =
      methodVerification === VerificationMethod.CODE
        ? this.getEmailCodeTemplate(value)
        : this.getEmailLinkTemplate(
            `${process.env.BASE_URL_CLIENT}/verification/email/confirm?token=${value}`,
          );

    return this.mailService.sendEmail({
      recipient: contactInfo.email,
      subject: `Верификация почты на сайте ${process.env.BASE_URL_CLIENT}`,
      html,
    });
  }

  async confirmEmail(userId: number, value: string) {
    const verification = await this.getVerificationEmailByUserId(userId);

    if (verification.expiresAt < new Date())
      throw new UnauthorizedException('Verification token has expired.');

    const isValidToken = await bcrypt.compare(value, verification.valueHash);
    if (!isValidToken)
      throw new UnauthorizedException('Invalid verification token.');

    const updateUser = await this.prisma.$transaction(async (tx) => {
      const user = await this.usersService.updateVerificationStatus(
        userId,
        VerificationType.EMAIL,
        true,
        tx,
      );
      await this.remove(verification.id, tx);
      return user;
    });

    const accessToken = this.authService.createAccessJwtToken({
      id: updateUser.id,
      role: updateUser.role.title,
      emailVerified: updateUser.emailVerified,
    });

    return {
      success: true,
      accessToken,
      message: 'Email successfully verified.',
    };
  }

  getEmailCodeTemplate(code: string) {
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
            Подтверждение email
          </div>

          <h1 style="
            margin: 0 0 14px;
            font-size: 28px;
            line-height: 1.3;
            color: #111827;
          ">
            Ваш код подтверждения
          </h1>

          <p style="
            margin: 0 0 28px;
            font-size: 16px;
            line-height: 1.6;
            color: #6b7280;
          ">
            Введите этот код на сайте, чтобы подтвердить свою электронную почту.
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
            Никому не сообщайте этот код. Если вы не запрашивали подтверждение,
            просто проигнорируйте это письмо.
          </p>
        </div>
      </div>
    `;
  }

  getEmailLinkTemplate(link: string) {
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
            Подтверждение email
          </div>

          <h1 style="
            margin: 0 0 14px;
            font-size: 28px;
            line-height: 1.3;
            color: #111827;
          ">
            Подтвердите свою почту
          </h1>

          <p style="
            margin: 0 0 30px;
            font-size: 16px;
            line-height: 1.6;
            color: #6b7280;
          ">
            Нажмите на кнопку ниже, чтобы завершить подтверждение электронной почты.
          </p>

          <a
            href="${link}"
            style="
              display: inline-block;
              padding: 14px 24px;
              border-radius: 12px;
              background-color: #4f46e5;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              font-weight: 700;
              margin-bottom: 28px;
            "
          >
            Подтвердить email
          </a>

          <p style="
            margin: 0 0 10px;
            font-size: 14px;
            line-height: 1.6;
            color: #6b7280;
          ">
            Ссылка действует в течение <strong>20 минут</strong>.
          </p>

          <p style="
            margin: 0 0 18px;
            font-size: 13px;
            line-height: 1.6;
            color: #9ca3af;
          ">
            Если кнопка не работает, скопируйте ссылку ниже и вставьте её в браузер:
          </p>

          <p style="
            margin: 0;
            word-break: break-all;
            font-size: 12px;
            line-height: 1.6;
            color: #6b7280;
          ">
            ${link}
          </p>
        </div>
      </div>
    `;
  }
}
