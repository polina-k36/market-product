import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service.js';
import { PaymentMethodsController } from './payment-methods.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
