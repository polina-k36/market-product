import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUnitDto } from './dto/create-unit.dto.js';
import { UpdateUnitDto } from './dto/update-unit.dto.js';

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        OR: [
          {
            shortTitle: createUnitDto.shortTitle,
          },
          {
            fullTitle: createUnitDto.fullTitle,
          },
        ],
        isDeleted: false,
      },
    });

    if (unit) {
      throw new ConflictException(
        'Unit with this short or full title already exists',
      );
    }

    return this.prisma.unit.create({
      data: createUnitDto,
    });
  }

  findAll() {
    return this.prisma.unit.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const unit = await this.prisma.unit.findFirst({
      where: { id, isDeleted: false },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        OR: [
          {
            shortTitle: updateUnitDto.shortTitle,
          },
          {
            fullTitle: updateUnitDto.fullTitle,
          },
        ],
        isDeleted: false,
        NOT: { id },
      },
    });

    if (unit) {
      throw new ConflictException(
        'Unit with this short or full title already exists',
      );
    }

    return this.prisma.unit.update({
      where: { id, isDeleted: false },
      data: updateUnitDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return this.prisma.unit.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
