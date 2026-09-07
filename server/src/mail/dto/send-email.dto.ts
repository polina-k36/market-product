import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    description: 'Email получателя',
    example: 'alice@example.com',
  })
  @IsString()
  recipient: string;

  @ApiProperty({
    description: 'Тема письма',
    example: 'Подтверждение электронной почты',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'HTML-содержимое письма',
    example: '<h1>Подтвердите вашу почту</h1>',
  })
  @IsString()
  html: string;

  @ApiPropertyOptional({
    description: 'Текстовая версия письма',
    example: 'Подтвердите вашу электронную почту.',
  })
  @IsOptional()
  @IsString()
  text?: string;
}
