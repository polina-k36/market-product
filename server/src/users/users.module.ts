import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UserIdentitiesModule } from '../user-identities/user-identities.module.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { UserAddressesModule } from '../user-addresses/user-addresses.module.js';

@Module({
  imports: [UserIdentitiesModule, SessionsModule, UserAddressesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
