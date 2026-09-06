import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserFromProviderDto {
  @ApiProperty({
    description: 'Имя пользователя',
    maxLength: 255,
    example: 'Алиса Орлова',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'alice@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Подтверждена ли электронная почта',
    example: false,
  })
  @IsBoolean()
  emailVerified: boolean;

  @ApiPropertyOptional({
    description: 'URL аватара пользователя',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  urlAvatar?: string;
}
