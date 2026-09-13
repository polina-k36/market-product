import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterOrdersDto } from './filter-orders.dto.js';

export class GetOrdersQueryDto extends IntersectionType(
  PaginationDto,
  FilterOrdersDto,
) {}
