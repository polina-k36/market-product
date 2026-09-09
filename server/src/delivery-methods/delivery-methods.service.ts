import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdateDeliveryMethodDto } from './dto/create-update-delivery-method.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DeliveryMethodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeliveryMethodDto: CreateUpdateDeliveryMethodDto) {
    const method = await this.prisma.deliveryMethod.findUnique({
      where: {
        title: createDeliveryMethodDto.title,
        isDeleted: false,
      },
    });

    if (method)
      throw new ConflictException(
        'Delivery method with this title already exists.',
      );
    return this.prisma.deliveryMethod.create({
      data: createDeliveryMethodDto,
    });
  }

  findAll() {
    return this.prisma.deliveryMethod.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const method = await this.prisma.deliveryMethod.findUnique({
      where: { id, isDeleted: false },
    });

    if (!method) throw new NotFoundException('Delivery method not found');
    return method;
  }

  async update(
    id: number,
    updateDeliveryMethodDto: CreateUpdateDeliveryMethodDto,
  ) {
    const method = await this.prisma.deliveryMethod.findUnique({
      where: {
        title: updateDeliveryMethodDto.title,
        isDeleted: false,
        NOT: { id },
      },
    });

    if (method)
      throw new ConflictException(
        'Delivery method with this title already exists.',
      );

    return this.prisma.deliveryMethod.update({
      data: updateDeliveryMethodDto,
      where: { id, isDeleted: false },
    });
  }

  remove(id: number) {
    return this.prisma.deliveryMethod.update({
      data: { isDeleted: true, deletedAt: new Date() },
      where: { id, isDeleted: false },
    });
  }
}
