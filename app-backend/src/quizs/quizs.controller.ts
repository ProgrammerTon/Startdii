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
  findOne(@Param('id') id: ObjectId) {
    return this.quizsService.findById(id);
  }

  @Patch(':id/:userId/submit')
  submitQuiz(@Param('id') id: ObjectId, @Param('userId') userId: ObjectId, @Body('ans') ans: (number | number[])[]) {
    return this.quizsService.submitQuiz(id,userId,ans);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizsService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizsService.remove(+id);
  }

  @Get('rating/:id')
  getRating(@Param('id') id: ObjectId) {
    return this.quizsService.getRating(id);
  }

  @Patch('rating/:id')
  userRating(@Param('id') id: ObjectId, @Body('score') score: number, @Body('raterId') raterId: ObjectId) {
    return this.quizsService.userRating(id,score,raterId as ObjectId);
  }

  @Patch('reset/:id')
  dataReset(@Param('id') id: ObjectId) {
    return this.quizsService.dataReset(id);
  }

}
