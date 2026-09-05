import { IsString } from 'class-validator';

export class ConfirmVerificationDto {
  @IsString()
  token: string;
}
