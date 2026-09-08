import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNdsDto } from './dto/create-nds.dto.js';
import { UpdateNdsDto } from './dto/update-nds.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NdsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNdDto: CreateNdsDto) {
    const nds = await this.prisma.nds.findFirst({
      where: {
        OR: [{ rate: createNdDto.rate }, { titleRate: createNdDto.titleRate }],
      },
    });
    if (nds) {
      throw new ConflictException(
        'NDS with this rate or titleRate already exists',
      );
    }
    return this.prisma.nds.create({
      data: createNdDto,
    });
  }

  findAll() {
    return this.prisma.nds.findMany();
  }

  async findById(id: number) {
    const nds = await this.prisma.nds.findUnique({
      where: { id },
    });
    if (!nds) throw new NotFoundException('NDS with this ID does not exist');
    return nds;
  }

  async update(id: number, updateNdsDto: UpdateNdsDto) {
    const nds = await this.prisma.nds.findFirst({
      where: {
        OR: [
          { rate: updateNdsDto.rate },
          { titleRate: updateNdsDto.titleRate },
        ],
      },
    });
    if (nds) {
      throw new ConflictException(
        'NDS with this rate or titleRate already exists',
      );
    }
    return this.prisma.nds.update({
      where: { id },
      data: updateNdsDto,
    });
  }

  remove(id: number) {
    return this.prisma.nds.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
