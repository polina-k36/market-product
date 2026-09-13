import { Global, Module } from '@nestjs/common';
import { JwtTokensService } from './jwt-tokens.service.js';
import { JwtModule } from '@nestjs/jwt';
import { SessionsModule } from '../sessions/sessions.module.js';

@Global()
@Module({
  imports: [JwtModule, SessionsModule],
  providers: [JwtTokensService],
  exports: [JwtTokensService],
})
export class JwtTokensModule {}
