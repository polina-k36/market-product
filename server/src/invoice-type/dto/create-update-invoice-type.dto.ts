import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdateInvoiceTypeDto {
  @ApiProperty({
    description: 'Название типа накладной',
    example: 'Приходная',
    maxLength: 45,
  })
  @IsString()
  @MaxLength(45)
  title: string;
}
