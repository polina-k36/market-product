import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsStrongPassword, Min } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: 'NewPassword123!',
    minLength: 6,
  })
  @IsStrongPassword({
    minLength: 6,
  })
  newPassword: string;

  @ApiProperty({
    description: 'Подтверждение нового пароля',
    example: 'NewPassword123!',
    minLength: 6,
  })
  @IsStrongPassword({
    minLength: 6,
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'Одноразовый токен для восстановления пароля',
    example: 'a8f4c1e9b7d2...',
  })
  @IsString()
  resetToken: string;

  @ApiProperty({
    description: 'ID записи верификации для восстановления пароля',
    example: 42,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  verificationId: number;
}
