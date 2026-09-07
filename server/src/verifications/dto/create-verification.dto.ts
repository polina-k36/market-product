import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

import { VerificationMethod } from '../enums/verification-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';

export class CreateVerificationDto {
  @ApiProperty({
    description: 'Хэш кода или токена верификации',
    example: '$2b$04$...',
  })
  @IsString()
  valueHash: string;

  @ApiProperty({
    description: 'Тип верификации',
    enum: VerificationType,
    example: VerificationType.EMAIL,
  })
  @IsEnum(VerificationType)
  type: VerificationType;

  @ApiProperty({
    description: 'Метод верификации',
    enum: VerificationMethod,
    example: VerificationMethod.CODE,
  })
  @IsEnum(VerificationMethod)
  method: VerificationMethod;

  @ApiProperty({
    description: 'ID пользователя',
    example: 12,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Дата и время окончания действия верификации',
    example: '2026-09-12T18:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  expiresAt: Date;
}
