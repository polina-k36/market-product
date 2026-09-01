import { Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification() {
    /*

    что получаем - id пользовтеля через access токен по нему находим почту и отправляем 
    создаем случайный токен создаем верификацию после формируме ссылку из токена и id верийикации и отправляем на почту 
     
    */

  }

  @Post('email/confirm')
  confirmEmailVerification() {
    
  }
}
