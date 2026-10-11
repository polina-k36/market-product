import { Test, TestingModule } from '@nestjs/testing';
import { StockReservationItemsService } from './stock-reservation-items.service.js';

describe('StockReservationItemsService', () => {
  let service: StockReservationItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockReservationItemsService],
    }).compile();

    service = module.get<StockReservationItemsService>(StockReservationItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
