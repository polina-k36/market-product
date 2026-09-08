import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, Min, Max } from 'class-validator';

export class CreateNdsDto {
  @ApiProperty({
    description: 'Ставка НДС в процентах',
    example: 20,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number;

  @ApiProperty({
    description: 'Название ставки НДС',
    example: 'НДС 20%',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  titleRate: string;
}
