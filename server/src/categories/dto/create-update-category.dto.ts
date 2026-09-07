import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUpdateCategoryDto {
  @ApiProperty({
    description: 'Название категории',
    example: 'Фрукты',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  title: string;
}
