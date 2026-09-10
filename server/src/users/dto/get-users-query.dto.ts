import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { FilterUsersDto } from './filter-users.dto.js';

export class GetUsersQueryDto extends IntersectionType(
  PaginationDto,
  FilterUsersDto,
) {}
