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

  upsert(verificationDto: CreateVerificationDto) {
    return this.prisma.verification.upsert({
      where: {
        userId_type: {
          userId: verificationDto.userId,
          type: verificationDto.type,
        },
      },
      update: {
        tokenHash: verificationDto.tokenHash,
        expiresAt: verificationDto.expiresAt,
      },
      create: verificationDto,
    });
  }

  async sendEmail(userId: number) {
    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);
    const verification = await this.upsert({
      userId,
      type: VerificationType.EMAIL,
      tokenHash: await bcrypt.hash(token, 4),
      expiresAt,
    });

    const contactInfo = await this.usersService.getUsersContactInfoById(userId);

    if (!contactInfo)
      throw new NotFoundException('Users contact info does not exist.');

    if (!contactInfo.email)
      throw new NotFoundException('Email does not exist.');

    const link = `${process.env.BASE_URL_CLIENT}/verification/email/confirm?id=${verification.id}&token=${token}`;

    this.mailService.sendEmail({
      recipient: contactInfo.email,
      subject: `Верификация почты на сайте ${process.env.BASE_URL_CLIENT}`,
      html: `Перейдите по ссылке чтобы подтвердить свою почту <br/>Вот ваша ссылка - ${link}`,
    });

    //отправка на почту но жто ссылка отправки на проверку
    //ввероятно нам нуэно это ссылку отдать фронту чтобы она хранила ее так как ссылку которую будет открывать
    // пользователь может быть ьссылка страницы фронта которая
    // это выполняет
  }

  async confirmEmail(userId: number, verificationId: number, token: string) {
    const verification = await this.getVerificationById(verificationId, userId);

    if (verification.expiresAt < new Date())
      throw new UnauthorizedException('Verification token has expired.');

    const isValidToken = await bcrypt.compare(token, verification.tokenHash);
    if (!isValidToken)
      throw new UnauthorizedException('Invalid verification token.');

    await this.usersService.updateVerificationStatus(
      userId,
      VerificationType.EMAIL,
      true,
    );
    await this.remove(verificationId);

    return {
      success: true,
      message: 'Email successfully verified',
    };
  }

  remove(id: number) {
    return this.prisma.verification.deleteMany({
      where: { id },
    });
  }
}
