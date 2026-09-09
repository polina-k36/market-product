import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto.js';
import { UpdateShopDto } from './dto/update-shop.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShopDto: CreateShopDto) {
    const shop = await this.prisma.shop.findFirst({
      where: {
        OR: [
          {
            city_street_house: {
              city: createShopDto.city,
              street: createShopDto.street,
              house: createShopDto.house,
            },
          },
          {
            phone: createShopDto.phone,
          },
        ],
        isDeleted: false,
      },
    });
    if (shop) {
      throw new ConflictException('Shop with this address already exists');
    }
    return this.prisma.shop.create({
      data: createShopDto,
    });
  }

  findAll() {
    return this.prisma.shop.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const shop = await this.prisma.shop.findUnique({
      where: { id, isDeleted: false },
    });
    if (!shop) throw new NotFoundException('Shop not found');

    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.prisma.shop.findFirst({
      where: {
        OR: [
          {
            city_street_house: {
              city: updateShopDto.city,
              street: updateShopDto.street,
              house: updateShopDto.house,
            },
          },
          {
            phone: updateShopDto.phone,
          },
        ],
        isDeleted: false,
        NOT: { id },
      },
    });
    if (shop) {
      throw new ConflictException('Shop with this address already exists');
    }
    return this.prisma.shop.update({
      where: { id, isDeleted: false },
      data: updateShopDto,
    });
  }

  remove(id: number) {
    return this.prisma.shop.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
