import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterInvoicesDto } from './filter-invoices.dto.js';

export class GetInvoicesQueryDto extends IntersectionType(
  PaginationDto,
  FilterInvoicesDto,
) {}
