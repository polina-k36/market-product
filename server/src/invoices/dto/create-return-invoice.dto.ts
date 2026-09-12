import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

import { CreateInvoiceItemDto } from '../../invoice-items/dto/create-invoice-item.dto.js';

export class CreateReturnInvoiceDto {
  @ApiProperty({
    description: 'ID заказа, по которому оформляется возврат товаров',
    example: 25,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  orderId: number;

  @ApiProperty({
    description: 'ID магазина, на склад которого возвращаются товары',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  shopId: number;

  @ApiProperty({
    description: 'Список товаров, возвращаемых на склад',
    type: [CreateInvoiceItemDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  products: CreateInvoiceItemDto[];
}
