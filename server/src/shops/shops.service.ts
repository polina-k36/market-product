import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto.js';
import { UpdateShopDto } from './dto/update-shop.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { FilterShopsDto } from './dto/filter-shops.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { ProductStockService } from '../product-stock/product-stock.service.js';
import { GetShopsQueryDto } from './dto/get-shops-query.dto.js';
import type { Shop } from '../generated/prisma/client.js';
@Injectable()
export class ShopsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productStockService: ProductStockService,
  ) {}

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

  async findAll(query: GetShopsQueryDto) {
    const { page, limit, search, city } = query;

    const conditions = [Prisma.sql`is_deleted = false`];

    if (search) {
      conditions.push(
        Prisma.sql`
          CONCAT(shop_city, ' ', shop_street, ' ', shop_house)
          LIKE ${`%${search}%`}
        `,
      );
    }

    if (city) {
      conditions.push(
        Prisma.sql`
          shop_city LIKE ${`%${city}%`}
        `,
      );
    }

    const shops = await this.prisma.$queryRaw<Shop[]>`
      SELECT *
      FROM shop
      WHERE ${Prisma.join(conditions, ' AND ')}
      LIMIT ${limit} OFFSET ${(page - 1) * limit} 
    `;

    const total = shops.length;
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: shops,
    };
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
    //stock
    return this.prisma.shop.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
