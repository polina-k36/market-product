import { Controller } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service.js';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}
}
