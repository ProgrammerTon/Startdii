import { Module } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { QuizsController } from './quizs.controller';

@Module({
  controllers: [QuizsController],
  providers: [QuizsService],
})
export class QuizsModule {}
