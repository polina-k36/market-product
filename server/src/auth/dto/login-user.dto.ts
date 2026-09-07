import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { IsEmailOrPhone } from '../../common/validators/email-or-phone.validator.js';
export class LoginUserDto {
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
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
