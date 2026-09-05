import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersService } from '../users/users.service.js';
import { JwtModule } from '@nestjs/jwt';
import { SessionsModule } from '../sessions/sessions.module.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '15m', // позже возмжно увеличу
      },
    }),
    SessionsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [JwtModule],
})
export class AuthModule {}
