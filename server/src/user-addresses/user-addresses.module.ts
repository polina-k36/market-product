import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service.js';
import { UserAddressesController } from './user-addresses.controller.js';

@Module({
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}
