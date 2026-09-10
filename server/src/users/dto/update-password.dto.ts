import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Текущий пароль пользователя',
    example: 'OldPassword123!',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: 'NewPassword123!',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  newPassword: string;

  @ApiProperty({
    description: 'Подтверждение нового пароля',
    example: 'NewPassword123!',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  confirmPassword: string;
}
