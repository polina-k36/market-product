import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @EmailVerified(true)
  @Post()
  async create(@Body() createCategoryDto: CreateUpdateCategoryDto) {
    return {
      success: true,
      data: await this.categoriesService.create(createCategoryDto),
    };
  }

  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.categoriesService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.categoriesService.findById(id),
    };
  }

  @EmailVerified(true)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateUpdateCategoryDto,
  ) {
    return {
      success: true,
      data: await this.categoriesService.update(id, updateCategoryDto),
    };
  }

  @EmailVerified(true)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.categoriesService.remove(id);
  }
}
