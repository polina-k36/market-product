import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceTypeController } from './invoice-types.controller.js';
import { InvoiceTypeService } from './invoice-types.service.js';

describe('InvoiceTypeController', () => {
  let controller: InvoiceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceTypeController],
      providers: [InvoiceTypeService],
    }).compile();

    controller = module.get<InvoiceTypeController>(InvoiceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
