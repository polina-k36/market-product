import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersService } from '../users/users.service.js';
import { JwtModule } from '@nestjs/jwt';
import { SessionsModule } from '../sessions/sessions.module.js';
import { UserIdentitiesService } from '../user-identities/user-identities.service.js';
import { UserAddressesModule } from '../user-addresses/user-addresses.module.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '15m', // позже возмжно увеличу
      },
    }),
    SessionsModule,
    UserAddressesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserIdentitiesService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
