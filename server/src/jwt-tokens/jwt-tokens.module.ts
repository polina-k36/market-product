import { Module } from '@nestjs/common';
import { JwtTokensService } from './jwt-tokens.service.js';
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
  providers: [JwtTokensService],
  exports: [JwtTokensService, JwtModule],
})
export class JwtTokensModule {}
