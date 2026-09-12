import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CreateInvoiceItemDto } from '../../invoice-items/dto/create-invoice-item.dto.js';

export class ReturnOrderDto {
  @ApiProperty({
    description: 'Список товаров, которые пользователь хочет вернуть',
    type: [CreateInvoiceItemDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  products: CreateInvoiceItemDto[];
}
