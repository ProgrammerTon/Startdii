import { Test, TestingModule } from '@nestjs/testing';
import { LevelsService } from './levels.service';

describe('QuizsService', () => {
  let service: LevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelsService],
    }).compile();

    service = module.get<LevelsService>(LevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
