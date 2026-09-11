import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'anna@example.com',
  })
  @IsEmail()
  email: string;
}
