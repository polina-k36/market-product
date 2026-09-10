import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        title: createProductDto.title,
        isDeleted: false,
      },
    });
    if (product)
      throw new ConflictException('Product with this title already exists');
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      where: { isDeleted: false },
    });
  }

  getProductPriceById(id: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    const product = client.product.findUnique({
      where: { id, isDeleted: false },
      select: { id: true, price: true },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, isDeleted: false },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        title: updateProductDto.title,
        isDeleted: false,
        NOT: { id },
      },
    });

    if (product)
      throw new ConflictException('Product with this title already exists');

    return this.prisma.product.update({
      where: { id, isDeleted: false },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
