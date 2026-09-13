import { Module } from '@nestjs/common';
import { UserCardsService } from './user-cards.service.js';
import { UserCardsController } from './user-cards.controller.js';

@Module({
  controllers: [UserCardsController],
  providers: [UserCardsService],
})
export class UserCardsModule {}
