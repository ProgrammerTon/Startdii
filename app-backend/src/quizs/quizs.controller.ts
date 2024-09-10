import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { TagsService } from 'src/tags/tags.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { SearchQuizDto } from './dto/search-quiz.dto';

@ApiTags('Quiz')
@Controller('quizs')
export class QuizsController {
  constructor(
    private readonly quizsService: QuizsService,
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    console.log(createQuizDto);
    return this.quizsService.create(createQuizDto);
  }

  // @Get()
  // findAll() {
  //   return this.quizsService.findAll();
  // }

  @Get()
  findByOffset(
    @Query()
    query: {
      offset: number;
      sortOrder: 'asc' | 'desc';
      title: string | null;
    },
  ) {
    if (!query.offset) return this.quizsService.findAll();
    const offset = query.offset;
    const sortOrder = query.sortOrder;
    if (!query.title) {
      return this.quizsService.findByOffset(offset, sortOrder);
    }
    const title = query.title;
    return this.quizsService.findByOffsetWithTitle(offset, sortOrder, title);
  }

  @Get('search')
  findByTitle(@Body() searchSourceDto: SearchQuizDto) {
    if (searchSourceDto.tags.length === 0) {
      return this.quizsService.searchByTitle(searchSourceDto.title);
    }
    if (!searchSourceDto.title && searchSourceDto.tags.length === 1) {
      return this.tagsService.getQuizs(searchSourceDto.tags[0]);
    }
    if (!searchSourceDto.title) {
      return this.quizsService.findSourcesByTags(searchSourceDto.tags);
    }
    return this.quizsService.findSourcesByTagsAndTitle(
      searchSourceDto.tags,
      searchSourceDto.title,
    );
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
  submitQuiz(
    @Param('id') id: ObjectId,
    @Param('userId') userId: ObjectId,
    @Body('ans') ans: (number | number[])[],
  ) {
    return this.quizsService.submitQuiz(id, userId, ans);
  }

  @Patch(':id/rating')
  userRating(
    @Param('id') id: ObjectId,
    @Body('score') score: number,
    @Body('raterId') raterId: ObjectId,
  ) {
    return this.quizsService.userRating(id, score, raterId as ObjectId);
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
