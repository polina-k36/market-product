import { IsString, IsStrongPassword, MaxLength } from 'class-validator';
import { IsEmailOrPhone } from '../../common/validators/email-or-phone.validator.js';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    maxLength: 255,
    example: 'Алиса Орлова',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Логин пользователя — email или номер телефона',
    example: 'alice@example.com',
  })
  @IsEmailOrPhone()
  login: string;

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
}
