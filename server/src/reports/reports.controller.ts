import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReportsService } from './reports.service.js';
import { ReportQueryDto } from './dto/report-query.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ReportType } from './types/reports.types.js';
import type { Response } from 'express';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('all-checks')
  @ApiOperation({
    summary: 'Получить отчёт по количеству заказов',
    description:
      'Возвращает количество заказов по каждому магазину за указанный период. ' +
      'Данные сгруппированы по адресу магазина и дате оформления заказов.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо сформировать отчёт. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Отчёт по количеству заказов успешно получен.',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            date: '01.11.2026',
            shopAddress: 'Москва, Ленина, д. 10',
            ordersCount: 25,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Некорректный параметр периода. Значение должно быть целым числом в допустимом диапазоне.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован. Отсутствует, недействителен или истёк JWT access token.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Доступ запрещён. Пользователь не обладает необходимой ролью администратора.',
  })
  async getAllChecks(@Query() query: ReportQueryDto) {
    return {
      success: true,
      data: await this.reportsService.getReport(
        ReportType.ALL_CHECKS,
        query.period,
      ),
    };
  }

  @Get('checks-state')
  @ApiOperation({
    summary: 'Получить отчёт о состоянии заказов',
    description:
      'Возвращает статистику выполненных и отменённых заказов по каждому магазину ' +
      'за указанный период с группировкой по дате оформления.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо сформировать отчёт. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Отчёт о состоянии заказов успешно получен.',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            date: '01.11.2026',
            shopAddress: 'Москва, Ленина, д. 10',
            completedOrders: 20,
            cancelledOrders: 3,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Некорректный параметр периода. Значение должно быть целым числом в допустимом диапазоне.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован. Отсутствует, недействителен или истёк JWT access token.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Доступ запрещён. Пользователь не обладает необходимой ролью администратора.',
  })
  async getChecksState(@Query() query: ReportQueryDto) {
    return {
      success: true,
      data: await this.reportsService.getReport(
        ReportType.CHECKS_STATE,
        query.period,
      ),
    };
  }

  @Get('avg')
  @ApiOperation({
    summary: 'Получить отчёт о среднем чеке',
    description:
      'Рассчитывает среднюю стоимость одного заказа для каждого магазина ' +
      'за указанный период на основе стоимости заказанных товаров. ' +
      'Магазины, в которых отсутствуют заказы за выбранный период, в отчёт не включаются.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо рассчитать средний чек. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Отчёт о среднем чеке успешно получен.',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            shopAddress: 'Москва, Ленина, д. 10',
            averageOrderPrice: 1250.5,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Некорректный параметр периода. Значение должно быть целым числом в допустимом диапазоне.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован. Отсутствует, недействителен или истёк JWT access token.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Доступ запрещён. Пользователь не обладает необходимой ролью администратора.',
  })
  async getAvg(@Query() query: ReportQueryDto) {
    return {
      success: true,
      data: await this.reportsService.getReport(ReportType.AVG, query.period),
    };
  }

  @Get('popular-categories')
  @ApiOperation({
    summary: 'Получить отчёт о популярных категориях товаров',
    description:
      'Возвращает рейтинг категорий товаров за указанный период, ' +
      'отсортированный по количеству проданных товаров. ' +
      'Для каждой категории отображаются общее количество продаж, ' +
      'выручка и процентная доля от общего объёма продаж.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо сформировать рейтинг. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Отчёт о популярных категориях успешно получен.',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            category: 'Молочные продукты',
            quantity: 150.5,
            revenue: 25000.75,
            salesShare: 35.2,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Некорректный параметр периода. Значение должно быть целым числом в допустимом диапазоне.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован. Отсутствует, недействителен или истёк JWT access token.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Доступ запрещён. Пользователь не обладает необходимой ролью администратора.',
  })
  async getPopularCategory(@Query() query: ReportQueryDto) {
    return {
      success: true,
      data: await this.reportsService.getReport(
        ReportType.POPULAR_CATEGORY,
        query.period,
      ),
    };
  }

  @Get('popular-products')
  @ApiOperation({
    summary: 'Получить отчёт о популярных товарах',
    description:
      'Возвращает рейтинг наиболее востребованных товаров за указанный период, ' +
      'отсортированный по количеству продаж. ' +
      'Для каждого товара отображаются наименование, проданное количество ' +
      'с учётом единицы измерения и общая выручка.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо сформировать рейтинг. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Отчёт о популярных товарах успешно получен.',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            product: 'Молоко 3,2%',
            soldQuantity: '125 л',
            revenue: 18750,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Некорректный параметр периода. Значение должно быть целым числом в допустимом диапазоне.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован. Отсутствует, недействителен или истёк JWT access token.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Доступ запрещён. Пользователь не обладает необходимой ролью администратора.',
  })
  async getPopularProduct(@Query() query: ReportQueryDto) {
    return {
      success: true,
      data: await this.reportsService.getReport(
        ReportType.POPULAR_PRODUCT,
        query.period,
      ),
    };
  }

  @Get('all-checks/excel')
  @ApiOperation({
    summary: 'Экспорт отчёта по количеству заказов в Excel',
    description:
      'Формирует и возвращает Excel-файл с количеством заказов ' +
      'по каждому магазину за указанный период.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description:
      'Количество последних дней, за которые необходимо сформировать отчёт. ' +
      'Если параметр не указан, используется значение 100.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel-файл успешно сформирован.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportAllChecksExcel(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.exportAllChecksExcel(query.period);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="all-checks.xlsx"',
    });

    return res.send(buffer);
  }

  @Get('checks-state/excel')
  @ApiOperation({
    summary: 'Экспорт отчёта о состоянии заказов в Excel',
    description:
      'Формирует Excel-файл со статистикой выполненных и отменённых заказов.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description: 'Количество последних дней для формирования отчёта.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel-файл успешно сформирован.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportChecksStateExcel(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.exportChecksStateExcel(
      query.period,
    );

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="checks-state.xlsx"',
    });

    return res.send(buffer);
  }

  @Get('avg/excel')
  @ApiOperation({
    summary: 'Экспорт отчёта о среднем чеке в Excel',
    description:
      'Формирует Excel-файл со средней стоимостью заказа по каждому магазину.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description: 'Количество последних дней для формирования отчёта.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel-файл успешно сформирован.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportAvgExcel(@Query() query: ReportQueryDto, @Res() res: Response) {
    const buffer = await this.reportsService.exportAvgExcel(query.period);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="average-check.xlsx"',
    });

    return res.send(buffer);
  }

  @Get('popular-categories/excel')
  @ApiOperation({
    summary: 'Экспорт отчёта о популярных категориях в Excel',
    description:
      'Формирует Excel-файл с рейтингом категорий, количеством продаж, ' +
      'выручкой и долей продаж.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description: 'Количество последних дней для формирования отчёта.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel-файл успешно сформирован.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportPopularCategoryExcel(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.exportPopularCategoryExcel(
      query.period,
    );

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="popular-categories.xlsx"',
    });

    return res.send(buffer);
  }

  @Get('popular-products/excel')
  @ApiOperation({
    summary: 'Экспорт отчёта о популярных товарах в Excel',
    description:
      'Формирует Excel-файл с рейтингом товаров, количеством продаж ' +
      'и общей выручкой.',
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description: 'Количество последних дней для формирования отчёта.',
    example: 100,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel-файл успешно сформирован.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportPopularProductExcel(
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.exportPopularProductExcel(
      query.period,
    );
    //FIXME: возможно вынести заголовок для получения
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="popular-products.xlsx"',
    });

    return res.send(buffer);
  }
}
