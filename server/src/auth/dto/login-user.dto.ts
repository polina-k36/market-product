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
    example: 'StrongPassword123!',
  })
  @IsString()
  password: string;
}
