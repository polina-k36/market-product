import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { UserAddressesModule } from '../user-addresses/user-addresses.module.js';
import { MailModule } from '../mail/mail.module.js';
import { VerificationsModule } from '../verifications/verifications.module.js';
import { UsersModule } from '../users/users.module.js';
import { UserIdentitiesModule } from '../user-identities/user-identities.module.js';

@Module({
  imports: [
    SessionsModule,
    UserAddressesModule,
    MailModule,
    UsersModule,
    UserIdentitiesModule,
    VerificationsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
