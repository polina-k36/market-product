import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { VerificationMethod } from '../enums/verification-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';
import { Type } from 'class-transformer';

export class CreateVerificationDto {
  @IsString()
  valueHash: string;

  @IsEnum(VerificationType)
  type: VerificationType;

  @IsEnum(VerificationType)
  method: VerificationMethod;

  @IsNumber()
  userId: number;

  @Type(() => Date)
  @IsDate()
  expiresAt: Date;
}
