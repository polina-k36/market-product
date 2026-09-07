import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class GoogleAuthDto {
  @ApiProperty({
    description: 'Google ID token, полученный после авторизации через Google',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...',
  })
  @IsString()
  credential: string;
}
