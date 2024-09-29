import { Test, TestingModule } from '@nestjs/testing';
import { QuizsService } from './quizs.service';

describe('QuizsService', () => {
  let service: QuizsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizsService],
    }).compile();

    service = module.get<QuizsService>(QuizsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
