import { Test, TestingModule } from '@nestjs/testing';
import { StockReservationController } from './stock-reservation.controller.js';
import { StockReservationService } from './stock-reservation.service.js';

describe('StockReservationController', () => {
  let controller: StockReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockReservationController],
      providers: [StockReservationService],
    }).compile();

    controller = module.get<StockReservationController>(StockReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
