import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ObjectId } from 'mongodb';

@Controller('quizs')
export class QuizsController {
  constructor(private readonly quizsService: QuizsService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    console.log(createQuizDto)
    return this.quizsService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizsService.findOne(+id);
  }

  @Get(':id/grade')
  countScore(@Param('id') id: ObjectId, @Body('ans') ans: (number | number[])[]) {
    return this.quizsService.countScore(id,ans);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizsService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizsService.remove(+id);
  }
}
