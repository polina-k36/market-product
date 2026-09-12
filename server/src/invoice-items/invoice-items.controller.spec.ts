import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceItemsController } from './invoice-items.controller.js';
import { InvoiceItemsService } from './invoice-items.service.js';

describe('InvoiceItemsController', () => {
  let controller: InvoiceItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceItemsController],
      providers: [InvoiceItemsService],
    }).compile();

    controller = module.get<InvoiceItemsController>(InvoiceItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
