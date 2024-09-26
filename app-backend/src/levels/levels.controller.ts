import {
    Controller,
    Post,
    Body,
    Get,
    Request,
    Param,
    Patch,
} from '@nestjs/common';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { Types } from 'mongoose';

import { LevelsService } from './levels.service';
  
@ApiTags('Level')
@Controller('levels')
export class LevelsController {
    constructor(
      private readonly levelsService: LevelsService,
    ) {}

    @Post(':userId')
    create(@Param('userId') userId: ObjectId){
      return this.levelsService.create({ownerId: userId})
    }
  
    @Get()
    findAll() {
      return this.levelsService.findAll();
    }

    @Patch(':userId/:expToAdd')
    addExp(@Param('userId', ParseObjectIdPipe) userId: ObjectId, @Param('expToAdd') expToAdd: number) {
      return this.levelsService.addExp(userId, expToAdd);
    }
    
    @Patch('reset_weekly_rating_exp')
    resetWeeklyRatingExp() {
      return this.levelsService.updateWeeklyRatingExp();
    }
}