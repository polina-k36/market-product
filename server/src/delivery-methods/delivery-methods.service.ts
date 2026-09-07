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
      where: { title: createDeliveryMethodDto.title },
    });

    if (method) throw new ConflictException('Method title must be unique.');
    return this.prisma.deliveryMethod.create({
      data: createDeliveryMethodDto,
    });
  }

  findAll() {
    return this.prisma.deliveryMethod.findMany();
  }

  async findById(id: number) {
    const method = await this.prisma.deliveryMethod.findUnique({
      where: { id },
    });

    if (!method) throw new NotFoundException('');
    return `This action returns a #${id} deliveryMethod`;
  }

  update(id: number, updateDeliveryMethodDto: CreateUpdateDeliveryMethodDto) {
    return this.prisma.deliveryMethod.update({
      data: updateDeliveryMethodDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.deliveryMethod.update({
      data: { isDeleted: true },
      where: { id },
    });
  }
}
