import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { VerificationType } from './enums/verification-type.enum.js';


@Injectable()
export class VerificationsService {

    constructor(private readonly prisma: PrismaService) {}

    upsert(verificationDto: CreateVerificationDto) {

        return this.prisma.verification.upsert({
            where: {
                userId_type: {
                    userId: verificationDto.userId,
                    type: verificationDto.type
                }
            },
            update: {
                tokenHash: verificationDto.tokenHash,
                expiresAt: verificationDto.expiresAt
            },
            create: verificationDto
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
            expiresAt
        });

        const link = `${process.env.BASE_URL_SERVER}/verification/email/confirm?id=${verification.id}&token=${token}`;

        //отправка на почту но жто ссылка отправки на проверку 
        //ввероятно нам нуэно это ссылку отдать фронту чтобы она хранила ее так как ссылку которую будет открывать 
        // пользователь может быть ьссылка страницы фронта которая 
        // это выполняет 

    }


    remove(id: number) {
        return this.prisma.verification.deleteMany({
            where: { id }
        });
    }
}
