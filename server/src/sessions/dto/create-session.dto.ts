import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Дата и время окончания сессии',
    example: '2026-09-07T18:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  expiresAt: Date;
}
