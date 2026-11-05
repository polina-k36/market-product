import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { ReportsController } from './reports.controller.js';
import { ExcelModule } from '../excel/excel.module.js';

@Module({
  imports: [ExcelModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
