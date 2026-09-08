import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdateSupplierDto } from './dto/create-update-supplier.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateUpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        title: createSupplierDto.title,
        isDeleted: false,
      },
    });

    if (supplier) {
      throw new ConflictException('Supplier with this title already exists');
    }

    return this.prisma.supplier.create({
      data: createSupplierDto,
    });
  }

  findAll() {
    return this.prisma.supplier.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async findById(id: number) {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  async update(id: number, updateSupplierDto: CreateUpdateSupplierDto) {
    const supplier = await this.findById(id);

    const duplicate = await this.prisma.supplier.findFirst({
      where: {
        title: updateSupplierDto.title,
        isDeleted: false,
        NOT: {
          id: supplier.id,
        },
      },
    });

    if (duplicate) {
      throw new ConflictException('Supplier with this title already exists');
    }

    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return this.prisma.supplier.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
