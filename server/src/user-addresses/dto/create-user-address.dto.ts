import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserAddressDto {
  @ApiProperty({
    description: 'Город',
    example: 'Москва',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  city: string;

  @ApiProperty({
    description: 'Улица',
    example: 'ул. Ленина',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  street: string;

  @ApiProperty({
    description: 'Номер дома',
    example: '15А',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  house: string;

  @ApiPropertyOptional({
    description: 'Номер квартиры',
    example: '12',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  apartment?: string;

  @ApiPropertyOptional({
    description: 'Комментарий к адресу',
    example: 'Домофон не работает',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
