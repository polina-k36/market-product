import { Test, TestingModule } from '@nestjs/testing';
import { NdsService } from './nds.service.js';

describe('NdsService', () => {
  let service: NdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NdsService],
    }).compile();

    service = module.get<NdsService>(NdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
