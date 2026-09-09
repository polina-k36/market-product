import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateUpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        title: createCategoryDto.title,
        isDeleted: false,
      },
    });

    if (category)
      throw new ConflictException('Category with this title already exists.');
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id, isDeleted: false },
    });

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, updateCategoryDto: CreateUpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        title: updateCategoryDto.title,
        isDeleted: false,
        NOT: { id },
      },
    });

    if (category)
      throw new ConflictException('Category with this title already exists.');
    return this.prisma.category.update({
      data: updateCategoryDto,
      where: { id, isDeleted: false },
    });
  }

  remove(id: number) {
    return this.prisma.category.update({
      data: { isDeleted: true, deletedAt: new Date() },
      where: { id, isDeleted: false },
    });
  }
}
