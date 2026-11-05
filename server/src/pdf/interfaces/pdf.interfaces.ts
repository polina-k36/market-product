export interface PdfOrderItem {
  title: string;
  quantity: string;
  price: number;
  sum: number;
}

export interface PdfOrderData {
  id: number;
  date: Date | string;
  shopAddress: string;
  payment: string;
  delivery: string;
  status: string;
  card: string;
  items: PdfOrderItem[];
}

export interface PdfInvoiceData {
  id: number;
  date: Date | string;
  shopAddress: string;
  invoiceType: string;
  supplier: string | null;
  items: PdfOrderItem[];
}
