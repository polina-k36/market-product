import { Module } from '@nestjs/common';
import { UserIdentitiesService } from './user-identities.service.js';

@Module({
  providers: [UserIdentitiesService]
})
export class UserIdentitiesModule {}
