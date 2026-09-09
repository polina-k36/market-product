import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user-card.dto.js';
import { UpdateUserCardDto } from './dto/update-user-card.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserCardsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createUserCardDto: CreateUserCardDto) {
    return this.prisma.userCard.create({
      data: {
        ...createUserCardDto,
        userId,
      },
    });
  }

  findAllByUserId(userId: number) {
    return this.prisma.userCard.findMany({
      where: { userId, isDeleted: false },
    });
  }

  async findById(id: number, userId: number) {
    const card = await this.prisma.userCard.findUnique({
      where: { id, userId, isDeleted: false },
    });
    if (!card) throw new NotFoundException('User card not found');
    return card;
  }

  update(id: number, userId: number, updateUserCardDto: UpdateUserCardDto) {
    return this.prisma.userCard.update({
      where: { id, userId, isDeleted: false },
      data: updateUserCardDto,
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.userCard.update({
      where: { id, userId, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
