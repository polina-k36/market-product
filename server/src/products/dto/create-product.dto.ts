import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Название товара',
    example: 'Молоко 3.2%',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Описание товара',
    example: 'Пастеризованное молоко жирностью 3.2%',
    maxLength: 1000,
  })
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'Состав товара',
    example: 'Молоко цельное, нормализованное',
    maxLength: 1000,
  })
  @IsString()
  @MaxLength(1000)
  composition: string;

  @ApiProperty({
    description: 'Ключ изображения товара в файловом хранилище',
    example: 'products/milk-3-2.webp',
  })
  @IsString()
  @MaxLength(255)
  imageKey: string;

  @ApiProperty({
    description: 'Цена товара',
    example: 129.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'ID категории товара',
    example: 1,
  })
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({
    description: 'ID единицы измерения',
    example: 2,
  })
  @IsInt()
  @Min(1)
  unitId: number;

  @ApiProperty({
    description: 'ID ставки НДС',
    example: 1,
  })
  @IsInt()
  @Min(1)
  ndsId: number;
}
