import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

import { CreateInvoiceItemDto } from '../../invoice-items/dto/create-invoice-item.dto.js';

export class CreateOutgoingInvoiceDto {
  @ApiProperty({
    description: 'ID заказа, для которого создаётся расходная накладная',
    example: 25,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  orderId: number;

  @ApiProperty({
    description: 'ID магазина, со склада которого списываются товары',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  shopId: number;

  @ApiProperty({
    description: 'Список товаров в расходной накладной',
    type: [CreateInvoiceItemDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  products: CreateInvoiceItemDto[];
}
