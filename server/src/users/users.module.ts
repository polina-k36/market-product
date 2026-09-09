import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UserIdentitiesModule } from '../user-identities/user-identities.module.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserIdentitiesModule, SessionsModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
