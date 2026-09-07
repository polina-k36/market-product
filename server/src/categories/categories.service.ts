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
      },
    });

    if (category) throw new ConflictException('Category title must be unique.');
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category is not found');
    return category;
  }

  update(id: number, updateCategoryDto: CreateUpdateCategoryDto) {
    return this.prisma.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.category.update({
      data: {
        isDeleted: true,
      },
      where: { id },
    });
  }
}
