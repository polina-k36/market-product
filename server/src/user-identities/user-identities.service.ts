import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserIdentityDto } from './dto/create-user-identity.dto.js';
import { AuthProviderEnum } from './enums/auth-provider.enum.js';

@Injectable()
export class UserIdentitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dtoUserIdentity: CreateUserIdentityDto) {
    return this.prisma.userIdentity.create({
      data: dtoUserIdentity,
    });
  }

  getIdentityByGoogleId(id: string) {
    return this.prisma.userIdentity.findUnique({
      where: {
        provider_providerAccountId: {
          provider: AuthProviderEnum.GOOGLE,
          providerAccountId: id,
        },
      },
    });
  }
}
