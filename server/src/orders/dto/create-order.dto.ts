import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../../order-items/dto/create-order-item.dto.js';

export class CreateOrderDto {
  @ApiPropertyOptional({
    description: 'Город доставки',
    example: 'Калининград',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  deliveryCity?: string;

  @ApiPropertyOptional({
    description: 'Улица доставки',
    example: 'Ленинский проспект',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  deliveryStreet?: string;

  @ApiPropertyOptional({
    description: 'Номер дома',
    example: '30',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  deliveryHouse?: string;

  @ApiPropertyOptional({
    description: 'Номер квартиры',
    example: '15',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  deliveryApartment?: string;

  @ApiProperty({
    description: 'ID магазина, из которого будет выполнен заказ',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  shopId: number;

  @ApiProperty({
    description: 'ID способа оплаты',
    example: 3,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  paymentMethodId: number;

  @ApiProperty({
    description: 'ID способа доставки',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  deliveryMethodId: number;

  @ApiPropertyOptional({
    description: 'ID сохранённой банковской карты пользователя',
    example: 5,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  userCardId?: number;

  @ApiProperty({
    description: 'Товары в заказе',
    type: [CreateOrderItemDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  products: CreateOrderItemDto[];
}
