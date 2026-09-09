import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';

import { CardBrandEnum } from '../enums/card-brand.enum.js';

export class CreateUserCardDto {
  @ApiProperty({
    description: 'Месяц окончания срока действия карты',
    example: 8,
    minimum: 1,
    maximum: 12,
  })
  @IsInt()
  @Min(1)
  @Max(12)
  expireMonth: number;

  @ApiProperty({
    description: 'Год окончания срока действия карты',
    example: 2028,
  })
  @IsInt()
  expireYear: number;

  @ApiProperty({
    description: 'Последние 4 цифры карты',
    example: '4242',
    minLength: 4,
    maxLength: 4,
  })
  @IsString()
  @Length(4, 4)
  cardLast4: string;

  @ApiProperty({
    description: 'Платёжная система карты',
    enum: CardBrandEnum,
    example: CardBrandEnum.MIR,
  })
  @IsEnum(CardBrandEnum)
  cardBrand: CardBrandEnum;
}
