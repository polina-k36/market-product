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
      },
    });
    if (type) throw new ConflictException('Invoice type must be unique.');
    return this.prisma.invoiceType.create({
      data: createInvoiceTypeDto,
    });
  }

  async findAll() {
    return this.prisma.invoiceType.findMany();
  }

  async findById(id: number) {
    const type = await this.prisma.invoiceType.findUnique({
      where: { id },
    });
    if (!type) throw new NotFoundException('Invoice type is not found.');
    return type;
  }

  update(id: number, updateInvoiceTypeDto: CreateUpdateInvoiceTypeDto) {
    return this.prisma.invoiceType.update({
      data: updateInvoiceTypeDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.invoiceType.update({
      data: { isDeleted: true },
      where: { id },
    });
  }
}
