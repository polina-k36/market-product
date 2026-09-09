import { Module } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-types.service.js';
import { InvoiceTypeController } from './invoice-types.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService],
})
export class InvoiceTypeModule {}
