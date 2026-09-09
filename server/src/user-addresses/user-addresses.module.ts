import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service.js';
import { UserAddressesController } from './user-addresses.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}
