import { IsString, IsStrongPassword, MaxLength } from 'class-validator';
import { IsEmailOrPhone } from '../../common/validators/email-or-phone.validator.js';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmailOrPhone()
  login: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
