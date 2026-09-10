import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class FilterUsersDto {
  @ApiPropertyOptional({
    description: 'Поиск по имени пользователя',
    example: 'Анна',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Поиск по номеру телефона пользователя',
    example: '+79991234567',
    maxLength: 20,
  })
  @IsOptional()
  @IsPhoneNumber('RU')
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Поиск по электронной почте пользователя',
    example: 'anna@example.com',
    maxLength: 255,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({
    description: 'Фильтр по подтверждённости электронной почты',
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  emailVerified?: boolean;

  @ApiPropertyOptional({
    description: 'ID роли пользователя',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  roleId?: number;

  @ApiPropertyOptional({
    description: 'Фильтр по статусу блокировки пользователя',
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isBanned?: boolean;
}
