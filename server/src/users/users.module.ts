import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UserIdentitiesModule } from '../user-identities/user-identities.module.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { VerificationsModule } from '../verifications/verifications.module.js';

@Module({
  imports: [UserIdentitiesModule, SessionsModule, VerificationsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
