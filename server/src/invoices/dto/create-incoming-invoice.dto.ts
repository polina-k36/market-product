import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

import { CreateInvoiceItemDto } from '../../invoice-items/dto/create-invoice-item.dto.js';

export class CreateIncomingInvoiceDto {
  @ApiProperty({
    description: 'ID магазина, на склад которого поступают товары',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  shopId: number;

  @ApiProperty({
    description: 'ID поставщика, от которого поступают товары',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  supplierId: number;

  @ApiProperty({
    description: 'Список товаров в приходной накладной',
    type: [CreateInvoiceItemDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  products: CreateInvoiceItemDto[];
}
