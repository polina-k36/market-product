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
    const payment = await this.prisma.paymentMethod.findUnique({
      where: {
        title: createPaymentMethodDto.title,
      },
    });
    if (payment)
      throw new ConflictException(
        'Payment method with this title already exists',
      );
    return await this.prisma.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  async findById(id: number) {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });
    if (!paymentMethod) throw new NotFoundException('Payment method not found');
    return paymentMethod;
  }

  async update(
    id: number,
    updatePaymentMethodDto: CreateUpdatePaymentMethodDto,
  ) {
    return await this.prisma.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.paymentMethod.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
