import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quiz')
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
  findOne(@Param('id') id: ObjectId) {
    return this.quizsService.findById(id);
  }

  @Get(':id/rating')
  getRating(@Param('id') id: ObjectId) {
    return this.quizsService.getRating(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizsService.update(id as ObjectId, updateQuizDto);
  }

  @Patch(':id/:userId/submit')
  submitQuiz(@Param('id') id: ObjectId, @Param('userId') userId: ObjectId, @Body('ans') ans: (number | number[])[]) {
    return this.quizsService.submitQuiz(id,userId,ans);
  }

  @Patch(':id/rating')
  userRating(@Param('id') id: ObjectId, @Body('score') score: number, @Body('raterId') raterId: ObjectId) {
    return this.quizsService.userRating(id,score,raterId as ObjectId);
  }

  @Patch(':id/reset')
  dataReset(@Param('id') id: ObjectId) {
    return this.quizsService.dataReset(id);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.quizsService.remove(id as ObjectId);
  }
}
