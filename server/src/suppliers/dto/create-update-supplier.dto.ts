import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdateSupplierDto {
  @ApiProperty({
    description: 'Название поставщика',
    example: 'ООО Ромашка',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  title: string;
}
