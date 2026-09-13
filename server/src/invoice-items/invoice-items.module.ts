import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service.js';

@Module({
  providers: [InvoiceItemsService],
  exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
