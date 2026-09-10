import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterShopsDto } from './filter-shops.dto.js';

export class GetShopsQueryDto extends IntersectionType(
  PaginationDto,
  FilterShopsDto,
) {}
