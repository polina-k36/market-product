import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserAddressDto } from './dto/create-user-address.dto.js';
import { UpdateUserAddressDto } from './dto/update-user-address.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UserAddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createUserAddressDto: CreateUserAddressDto) {
    const userAddress = await this.prisma.userAddress.findFirst({
      where: {
        ...createUserAddressDto,
        userId,
      },
    });

    if (userAddress) {
      throw new ConflictException('User address with this data already exists');
    }

    return this.prisma.userAddress.create({
      data: {
        ...createUserAddressDto,
        userId,
      },
    });
  }

  findAllByUserId(userId: number) {
    return this.prisma.userAddress.findMany({
      where: { userId },
    });
  }

  async findById(id: number, userId: number) {
    const address = await this.prisma.userAddress.findUnique({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException('User address not found');
    }

    return address;
  }

  update(
    id: number,
    userId: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.prisma.userAddress.update({
      where: { id, userId },
      data: updateUserAddressDto,
    });
  }

  removeByUserId(userId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.userAddress.deleteMany({
      where: { userId },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.userAddress.delete({
      where: { id, userId },
    });
  }
}
