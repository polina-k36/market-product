import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller.js';
import { ShopsService } from './shops.service.js';

describe('ShopsController', () => {
  let controller: ShopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsController],
      providers: [ShopsService],
    }).compile();

    controller = module.get<ShopsController>(ShopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
