import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdateStatusDto } from './dto/create-update-status.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StatusesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStatusDto: CreateUpdateStatusDto) {
    const status = await this.prisma.status.findUnique({
      where: {
        title: createStatusDto.title,
      },
    });
    if (status)
      throw new ConflictException('Status with this title already exists');
    return this.prisma.status.create({
      data: createStatusDto,
    });
  }

  findAll() {
    return this.prisma.status.findMany();
  }

  async findById(id: number) {
    const status = await this.prisma.status.findUnique({
      where: { id },
    });
    if (!status) throw new NotFoundException('Status not found');
    return status;
  }

  async update(id: number, updateStatusDto: CreateUpdateStatusDto) {
    const status = await this.prisma.status.findUnique({
      where: {
        title: updateStatusDto.title,
      },
    });
    if (status)
      throw new ConflictException('Status with this title already exists');
    return this.prisma.status.update({
      where: { id },
      data: updateStatusDto,
    });
  }

  remove(id: number) {
    return this.prisma.status.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
