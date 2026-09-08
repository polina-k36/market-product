import { Test, TestingModule } from '@nestjs/testing';
import { NdsController } from './nds.controller.js';
import { NdsService } from './nds.service.js';

describe('NdsController', () => {
  let controller: NdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NdsController],
      providers: [NdsService],
    }).compile();

    controller = module.get<NdsController>(NdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
