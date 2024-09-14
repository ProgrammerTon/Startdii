import { Test, TestingModule } from '@nestjs/testing';
import { QuizsController } from './quizs.controller';
import { QuizsService } from './quizs.service';

describe('QuizsController', () => {
  let controller: QuizsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizsController],
      providers: [QuizsService],
    }).compile();

    controller = module.get<QuizsController>(QuizsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
