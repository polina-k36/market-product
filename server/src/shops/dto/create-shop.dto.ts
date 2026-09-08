import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({
    description: 'Город, в котором находится магазин',
    example: 'Москва',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  city: string;

  @ApiProperty({
    description: 'Улица, на которой находится магазин',
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

  @ApiProperty({
    description: 'Контактный номер телефона магазина',
    example: '+79991234567',
  })
  @IsPhoneNumber('RU')
  phone: string;
}
