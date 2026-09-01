import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSessionDto } from './dto/create-session.dto.js';

@Injectable()
export class SessionsService {

    constructor(private readonly prisma: PrismaService) {}

    async getSessionById(id: number, userId: number) {
        const session = await this.prisma.session.findUnique({
            where: {
                id,
                userId,
            }
        });

        if (!session) throw new UnauthorizedException();

        return session;
    }

    create(sessionDto: CreateSessionDto) {
        return this.prisma.session.create({
            data: sessionDto,
            select: { id: true }
        });
    }

    updateTokenHash(id: number, userId: number, tokenHash: string) {
        return this.prisma.session.update({
            data: { tokenHash },
            where: { id, userId }
        })
    }

    async remove(id: number, userId: number) {
        
        const session = await this.prisma.session.findUnique({
            where: {
                id, userId
            },
            select: { id: true }
        });

        if (!session) throw new NotFoundException('');

        return await this.prisma.session.delete({
            where: {
                id, userId
            }
        });
    }

}
