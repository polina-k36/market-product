import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSessionDto {
  @IsNumber()
  userId: number;

  @Type(() => Date)
  @IsDate()
  expiresAt: Date;
}
