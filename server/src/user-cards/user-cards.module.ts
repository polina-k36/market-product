import { Module } from '@nestjs/common';
import { UserCardsService } from './user-cards.service.js';
import { UserCardsController } from './user-cards.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserCardsController],
  providers: [UserCardsService],
})
export class UserCardsModule {}
