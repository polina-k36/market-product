import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service.js';
import { InvoicesController } from './invoices.controller.js';
import { InvoiceItemsModule } from '../invoice-items/invoice-items.module.js';

@Module({
  imports: [InvoiceItemsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
