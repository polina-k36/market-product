import { CreateInvoiceItemDto } from '../../invoice-items/dto/create-invoice-item.dto.js';

export interface ICreateInvoice {
  supplierId?: number;
  orderId?: number;
  shopId: number;
  products: CreateInvoiceItemDto[];
}
