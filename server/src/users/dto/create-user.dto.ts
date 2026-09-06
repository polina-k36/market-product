import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IsEmailOrPhone } from '../../common/validators/email-or-phone.validator.js';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEmailOrPhone()
  login?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  password?: string;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @IsOptional()
  @IsString()
  urlAvatar?: string;

  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
