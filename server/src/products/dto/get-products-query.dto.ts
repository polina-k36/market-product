import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterProductsDto } from './filter-products.dto.js';

export class GetProductsQueryDto extends IntersectionType(
  PaginationDto,
  FilterProductsDto,
) {}
