import {
    Controller,
    Post,
    Body,
    Get,
    Request,
    Param,
    Patch,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { Types } from 'mongoose';

import { ProgressionsService } from './progressions.service';
import { CreateProgressionDto } from './dto/create-progression.dto';

@ApiTags('Progression')
@Controller('progressions')
export class ProgressionsController {
    constructor(
        private readonly progressionsService: ProgressionsService,
    ) {}

/*     @Cron()
    @Post(':userId')
    create(@Body() createProgressionDto: CreateProgressionDto, 
           @Param('userId') userId: ObjectId) {
        return this.progressionsService.create(createProgressionDto, userId);
    } */
  
    @Get()
    findAll() {
        return this.progressionsService.findAll();
    }
  
}