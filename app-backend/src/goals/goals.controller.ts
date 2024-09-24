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

import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@ApiTags('Goal')
@Controller('goals')
export class GoalsController {
    constructor(
        private readonly goalsService: GoalsService,
    ) {}

    @Post()
    create(@Body() createGoalDto: CreateGoalDto) {
        return this.goalsService.create(createGoalDto);
    }
  
    @Get()
    findAll() {
        return this.goalsService.findAll();
    }
  
}