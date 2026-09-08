import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdateStatusDto {
  @ApiProperty({
    description: 'Название статуса заказа',
    example: 'В обработке',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  title: string;
}
