import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdateDeliveryMethodDto {
  @ApiProperty({
    description: 'Название метода доставки',
    example: 'Самовывоз',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  title: string;
}
