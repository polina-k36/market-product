import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, Min } from 'class-validator';

import { InvoiceTypeEnum } from '../../common/enums/invoice-type.enum.js';

export class FilterInvoicesDto {
  @ApiPropertyOptional({
    description: 'Дата и время, начиная с которых выполняется фильтрация',
    example: '2026-09-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateFrom?: Date;

  @ApiPropertyOptional({
    description: 'Дата и время, до которых выполняется фильтрация',
    example: '2026-09-30T23:59:59.999Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateTo?: Date;

  @ApiPropertyOptional({
    description: 'ID поставщика',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  supplierId?: number;

  @ApiPropertyOptional({
    description: 'Тип накладной',
    enum: InvoiceTypeEnum,
    example: InvoiceTypeEnum.INCOMING,
  })
  @IsOptional()
  @IsEnum(InvoiceTypeEnum)
  invoiceTypeId?: InvoiceTypeEnum;

  @ApiPropertyOptional({
    description: 'ID магазина',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId?: number;
}
