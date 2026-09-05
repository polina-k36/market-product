import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfirmVerificationDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsString()
  token: string;
}
