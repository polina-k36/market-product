import { IsEnum, IsNumber, IsString } from 'class-validator';
import { AuthProviderEnum } from '../enums/auth-provider.enum.js';

export class CreateUserIdentityDto {
  @IsNumber()
  userId: number;

  @IsEnum(AuthProviderEnum)
  provider: AuthProviderEnum;

  @IsString()
  providerAccountId: string;
}
