import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterProductStockDto } from './filter-product-stock.dto.js';

export class GetProductStockQueryDto extends IntersectionType(
  PaginationDto,
  FilterProductStockDto,
) {}
