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

@Injectable()
export class VerificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
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

  remove(id: number) {
    return this.prisma.verification.deleteMany({
      where: { id },
    });
  }

  async sendEmail(userId: number, methodVerification: VerificationMethod) {
    const value =
      methodVerification === VerificationMethod.CODE
        ? crypto.randomInt(100000, 1000000).toString()
        : crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    const verification = await this.upsert({
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

    const link = `${process.env.BASE_URL_CLIENT}/verification/email/confirm?token=${value}`;

    const html =
      methodVerification === VerificationMethod.CODE
        ? `Вот ваш код подтверждения - ${value}. <br/>Никому не сообщайте его. Он действует в течение 5 минут.`
        : `Перейдите по ссылке чтобы подтвердить свою почту <br/>Вот ваша ссылка - ${link}`;

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

    await this.usersService.updateVerificationStatus(
      userId,
      VerificationType.EMAIL,
      true,
    );
    await this.remove(verification.id);

    return {
      success: true,
      message: 'Email successfully verified',
    };
  }
}
