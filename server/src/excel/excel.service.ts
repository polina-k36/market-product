import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  createWorkbook(): ExcelJS.Workbook {
    return new ExcelJS.Workbook();
  }

  createWorksheet(workbook: ExcelJS.Workbook, name: string): ExcelJS.Worksheet {
    return workbook.addWorksheet(name);
  }

  addTable<T>(
    worksheet: ExcelJS.Worksheet,
    columns: Partial<ExcelJS.Column>[],
    data: T[],
  ): void {
    worksheet.columns = columns as ExcelJS.Column[];

    worksheet.addRows(data);

    worksheet.views = [
      {
        state: 'frozen',
        ySplit: 1,
        topLeftCell: 'A2',
        activeCell: 'A2',
      },
    ];

    const headerRow = worksheet.getRow(1);

    headerRow.height = 30;

    headerRow.eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 11,
        bold: true,
        color: { argb: '#000' },
      };

      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };

      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'medium', color: { argb: 'FF94A3B8' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      };
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      row.height = 24;

      row.eachCell((cell) => {
        cell.font = {
          name: 'Arial',
          size: 10,
          color: { argb: 'FF334155' },
        };

        cell.alignment = {
          vertical: 'middle',
          horizontal: typeof cell.value === 'number' ? 'right' : 'left',
          indent: 1,
        };

        cell.border = {
          bottom: {
            style: 'thin',
            color: { argb: 'FFE2E8F0' },
          },
        };
      });
    });

    if (data.length > 0) {
      worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: {
          row: data.length + 1,
          column: columns.length,
        },
      };
    }
  }

  async toBuffer(workbook: ExcelJS.Workbook): Promise<Buffer> {
    const buffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(buffer);
  }

  async saveToFile(
    workbook: ExcelJS.Workbook,
    filePath: string,
  ): Promise<void> {
    await workbook.xlsx.writeFile(filePath);
  }

  async generateExcel<T>(
    sheetName: string,
    columns: Partial<ExcelJS.Column>[],
    data: T[],
  ): Promise<Buffer> {
    const workbook = this.createWorkbook();

    workbook.creator = 'Market Admin';
    workbook.created = new Date();

    const worksheet = this.createWorksheet(workbook, sheetName);

    this.addTable<T>(worksheet, columns, data);

    return this.toBuffer(workbook);
  }
}
