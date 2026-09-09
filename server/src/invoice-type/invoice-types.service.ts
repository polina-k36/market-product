import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUpdateInvoiceTypeDto } from './dto/create-update-invoice-type.dto.js';

@Injectable()
export class InvoiceTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceTypeDto: CreateUpdateInvoiceTypeDto) {
    const type = await this.prisma.invoiceType.findUnique({
      where: {
        title: createInvoiceTypeDto.title,
        isDeleted: false,
      },
    });
    if (type)
      throw new ConflictException(
        'Invoice type with this title already exists.',
      );
    return this.prisma.invoiceType.create({
      data: createInvoiceTypeDto,
    });
  }

  async findAll() {
    return this.prisma.invoiceType.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const type = await this.prisma.invoiceType.findUnique({
      where: { id, isDeleted: false },
    });
    if (!type) throw new NotFoundException('Invoice type not found.');
    return type;
  }

  async update(id: number, updateInvoiceTypeDto: CreateUpdateInvoiceTypeDto) {
    const type = await this.prisma.invoiceType.findUnique({
      where: {
        title: updateInvoiceTypeDto.title,
        isDeleted: false,
        NOT: { id },
      },
    });
    if (type)
      throw new ConflictException(
        'Invoice type with this title already exists.',
      );
    return this.prisma.invoiceType.update({
      data: updateInvoiceTypeDto,
      where: { id, isDeleted: false },
    });
  }

  remove(id: number) {
    return this.prisma.invoiceType.update({
      data: { isDeleted: true, deletedAt: new Date() },
      where: { id, isDeleted: false },
    });
  }
}
