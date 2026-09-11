import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokensService } from './jwt-tokens.service.js';

describe('JwtTokensService', () => {
  let service: JwtTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtTokensService],
    }).compile();

    service = module.get<JwtTokensService>(JwtTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
