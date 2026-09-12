import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service.js';
import { InvoiceItemsController } from './invoice-items.controller.js';

@Module({
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService],
  exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
