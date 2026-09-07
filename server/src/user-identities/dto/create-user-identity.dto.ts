import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { AuthProviderEnum } from '../enums/auth-provider.enum.js';

export class CreateUserIdentityDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Внешний провайдер авторизации',
    enum: AuthProviderEnum,
    example: AuthProviderEnum.GOOGLE,
  })
  @IsEnum(AuthProviderEnum)
  provider: AuthProviderEnum;

  @ApiProperty({
    description: 'Идентификатор аккаунта пользователя у внешнего провайдера',
    example: '123456789012345678901',
  })
  @IsString()
  providerAccountId: string;
}
