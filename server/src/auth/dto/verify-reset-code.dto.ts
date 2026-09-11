import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class VerifyResetCodeDto {
  @ApiProperty({
    description: 'ID записи верификации для восстановления пароля',
    example: 42,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  verificationId: number;

  @ApiProperty({
    description: 'Шестизначный код восстановления, отправленный на email',
    example: '483921',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @Length(6, 6)
  code: string;
}
