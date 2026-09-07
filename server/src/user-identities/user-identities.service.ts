import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserIdentityDto } from './dto/create-user-identity.dto.js';
import { AuthProviderEnum } from './enums/auth-provider.enum.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UserIdentitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    dtoUserIdentity: CreateUserIdentityDto,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    return client.userIdentity.create({
      data: dtoUserIdentity,
    });
  }

  getIdentity(provider: AuthProviderEnum, providerAccountId: string) {
    return this.prisma.userIdentity.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            emailVerified: true,
            isBanned: true,
          },
        },
      },
    });
  }

  removeByUserId(userId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.userIdentity.deleteMany({
      where: { userId },
    });
  }
}
