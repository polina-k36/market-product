import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    maxLength: 255,
    example: 'Алиса Орлова',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    minLength: 6,
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

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
