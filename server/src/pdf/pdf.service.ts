import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import {
  PdfInvoiceData,
  PdfOrderData,
  PdfOrderItem,
} from './interfaces/pdf.interfaces.js';

@Injectable()
export class PdfService {
  private readonly regularFont = 'src/common/fonts/Arial.ttf';
  private readonly boldFont = 'src/common/fonts/Arial-Bold.ttf';

  private readonly tableFontSize = 10;
  private readonly headerFontSize = 11;
  private readonly rowPadding = 10;
  private readonly headerHeight = 33;
  private readonly minRowHeight = 30;

  private async generatePdf(
    buildDocument: (doc: PDFKit.PDFDocument) => void,
  ): Promise<Buffer> {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 45,
        bottom: 45,
        left: 45,
        right: 45,
      },
    });

    doc.font(this.regularFont);

    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      try {
        buildDocument(doc);
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private drawTableHeader(
    doc: PDFKit.PDFDocument,
    headers: string[],
    columnWidths: number[],
    startX: number,
    y: number,
  ): number {
    const height = this.headerHeight;

    doc.font(this.boldFont).fontSize(this.headerFontSize);

    let x = startX;

    headers.forEach((header, index) => {
      doc.rect(x, y, columnWidths[index], height).stroke();

      doc.text(header, x + this.rowPadding, y + 8, {
        width: columnWidths[index] - this.rowPadding * 2,
        height: height - 12,
        align: index === 0 ? 'left' : 'center',
      });

      x += columnWidths[index];
    });

    return y + height;
  }

  private drawItemsTable(
    doc: PDFKit.PDFDocument,
    items: PdfOrderItem[],
  ): number {
    const headers = ['Товар', 'Кол-во', 'Цена, руб.', 'Сумма, руб.'];

    const pageWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    const columnWidths = [
      pageWidth * 0.4,
      pageWidth * 0.2,
      pageWidth * 0.2,
      pageWidth * 0.2,
    ];

    const startX = doc.page.margins.left;
    const bottomLimit = doc.page.height - doc.page.margins.bottom;

    let total = 0;
    let y = doc.y;

    y = this.drawTableHeader(doc, headers, columnWidths, startX, y);
    doc.font(this.regularFont).fontSize(this.tableFontSize);

    for (const item of items) {
      const values = [
        item.title,
        item.quantity,
        item.price.toFixed(2),
        item.sum.toFixed(2),
      ];

      const titleHeight = doc.heightOfString(item.title, {
        width: columnWidths[0] - this.rowPadding * 2,
      });

      const rowHeight = Math.max(
        this.minRowHeight,
        titleHeight + this.rowPadding * 2,
      );

      if (y + rowHeight > bottomLimit) {
        doc.addPage();

        y = doc.page.margins.top;

        y = this.drawTableHeader(doc, headers, columnWidths, startX, y);

        doc.font(this.regularFont).fontSize(this.tableFontSize);
      }

      let x = startX;

      values.forEach((value, index) => {
        doc.rect(x, y, columnWidths[index], rowHeight).stroke();

        doc.text(value, x + this.rowPadding, y + this.rowPadding, {
          width: columnWidths[index] - this.rowPadding * 2,
          height: rowHeight - this.rowPadding * 2,
          align: index === 0 ? 'left' : 'right',
        });

        x += columnWidths[index];
      });

      y += rowHeight;
      total += item.sum;
    }

    doc.y = y + 28;

    return total;
  }

  private drawTotal(doc: PDFKit.PDFDocument, total: number): void {
    doc.moveDown(0.5);

    doc
      .font(this.boldFont)
      .fontSize(13)
      .text(`ИТОГО: ${total.toFixed(2)} руб.`, {
        align: 'right',
      });

    doc.moveDown(1);
  }

  async generateOrderPdf(order: PdfOrderData): Promise<Buffer> {
    return this.generatePdf((doc) => {
      doc.font(this.boldFont).fontSize(18).text('КАССОВЫЙ ЧЕК', {
        align: 'center',
      });

      doc.moveDown(0.3);

      doc.font(this.regularFont).fontSize(11).text(`Заказ № ${order.id}`, {
        align: 'center',
      });

      doc.fontSize(10).text(`Дата: ${this.formatDate(order.date)}`, {
        align: 'center',
      });

      doc.moveDown(1.5);

      doc.font(this.regularFont).fontSize(10.5);

      doc.text(`Магазин: ${order.shopAddress}`);
      doc.moveDown(0.5);

      doc.text(`Доставка: ${order.delivery}`);
      doc.moveDown(0.5);

      doc.text(`Оплата: ${order.payment}`);
      doc.moveDown(0.5);

      if (
        order.payment.toLowerCase().includes('онлайн') ||
        order.payment.toLowerCase().includes('карт')
      ) {
        doc.text(`Карта: ${order.card}`);
        doc.moveDown(0.5);
      }

      doc.font(this.boldFont).fontSize(10.5).text(`Статус: ${order.status}`);

      doc.moveDown(1.5);

      const total = this.drawItemsTable(doc, order.items);

      this.drawTotal(doc, total);

      if (order.status.toLowerCase().includes('отмен')) {
        doc.moveDown(0.5);

        doc.font(this.boldFont).fontSize(13).text('ОПЕРАЦИЯ ОТМЕНЕНА', {
          align: 'center',
        });

        doc.moveDown(0.5);
      }

      doc
        .font(this.regularFont)
        .fontSize(11)
        .text('Спасибо за покупку!', 40, doc.y, {
          width: doc.page.width - 80,
          align: 'center',
        });
    });
  }

  async generateInvoicePdf(invoice: PdfInvoiceData): Promise<Buffer> {
    return this.generatePdf((doc) => {
      doc.font(this.boldFont).fontSize(10).text('ЛОГОТИП МАГАЗИНА', {
        align: 'center',
      });

      doc.moveDown(0.5);

      doc
        .font(this.boldFont)
        .fontSize(18)
        .text(`Накладная ${invoice.invoiceType} № ${invoice.id}`, {
          align: 'center',
        });

      doc.moveDown(0.3);

      doc
        .font(this.regularFont)
        .fontSize(10)
        .text(`Дата: ${this.formatDate(invoice.date)}`, {
          align: 'center',
        });

      doc.moveDown(1.5);

      doc.font(this.regularFont).fontSize(10.5);

      doc.text(`Магазин: ${invoice.shopAddress}`);
      doc.moveDown(0.5);

      if (invoice.supplier) {
        doc.text(`Поставщик: ${invoice.supplier}`);
        doc.moveDown(0.5);
      }

      doc.moveDown(1);

      const total = this.drawItemsTable(doc, invoice.items);
      this.drawTotal(doc, total);
    });
  }

  private formatDate(date: Date | string): string {
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
