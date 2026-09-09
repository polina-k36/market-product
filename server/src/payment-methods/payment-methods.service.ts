import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdatePaymentMethodDto } from './dto/create-update-payment-method.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentMethodDto: CreateUpdatePaymentMethodDto) {
    const method = await this.prisma.paymentMethod.findUnique({
      where: {
        title: createPaymentMethodDto.title,
        isDeleted: false,
      },
    });
    if (method)
      throw new ConflictException(
        'Payment method with this title already exists',
      );
    return await this.prisma.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  findAll() {
    return this.prisma.paymentMethod.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const method = await this.prisma.paymentMethod.findUnique({
      where: { id, isDeleted: false },
    });
    if (!method) throw new NotFoundException('Payment method not found');
    return method;
  }

  async update(
    id: number,
    updatePaymentMethodDto: CreateUpdatePaymentMethodDto,
  ) {
    const method = await this.prisma.paymentMethod.findUnique({
      where: {
        title: updatePaymentMethodDto.title,
        isDeleted: false,
        NOT: { id },
      },
    });
    if (method)
      throw new ConflictException(
        'Payment method with this title already exists',
      );
    return await this.prisma.paymentMethod.update({
      where: { id, isDeleted: false },
      data: updatePaymentMethodDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.paymentMethod.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
