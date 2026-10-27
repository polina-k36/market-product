export interface IInvoice {
  shop: string;
  invoiceType: string;
  supplier: string | null;
  id: number;
  date: Date;
  orderId: number | null;
}
