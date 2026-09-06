import { IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  recipient: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;
}
