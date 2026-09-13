import { Module } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-types.service.js';
import { InvoiceTypeController } from './invoice-types.controller.js';

@Module({
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService],
})
export class InvoiceTypeModule {}
