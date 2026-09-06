import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Имя пользователя',
    maxLength: 255,
    example: 'Алиса Орлова',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'URL аватара пользователя',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  urlAvatar?: string;

  @ApiPropertyOptional({
    description: 'Номер телефона пользователя',
    example: '+7 900 000-00-00',
  })
  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;

  @ApiPropertyOptional({
    description: 'Электронная почта пользователя',
    example: 'alice@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Дата рождения пользователя',
    example: '2000-05-15',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthDate?: Date;
}
