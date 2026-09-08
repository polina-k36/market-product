import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdatePaymentMethodDto {
  @ApiProperty({
    description: 'Название способа оплаты',
    example: 'Банковская карта',
    maxLength: 45,
  })
  @IsString()
  @MaxLength(255)
  title: string;
}
