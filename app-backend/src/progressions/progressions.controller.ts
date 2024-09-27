import {
    Controller,
    Post,
    Body,
    Get,
    Request,
    Param,
    Patch,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { Types } from 'mongoose';

import { ProgressionsService } from './progressions.service';
import { CreateProgressionDto } from './dto/create-progression.dto';
import { GoalType } from 'src/goals/entity/goal.entitiy';

@ApiTags('Progression')
@Controller('progressions')
export class ProgressionsController {
    constructor(
        private readonly progressionsService: ProgressionsService,
    ) {}
  
    @Get()
    findAll() {
        return this.progressionsService.findAll();
    }

    @Get(':userId')
    findUserGoal(@Param('userId', ParseObjectIdPipe) userId: ObjectId) {
      return this.progressionsService.findUserGoal(userId);
    }
    
    @Patch(':userId/:goalType')
    updateProgress(@Param('userId', ParseObjectIdPipe) userId: ObjectId, @Param('goalType') goalType: GoalType) {
        return this.progressionsService.updateProgress(userId, goalType);
    }

    @Patch('reset_weekly_goal')
    resetWeeklyGoal() {
        return this.progressionsService.updateWeeklyGoal();
    }
}