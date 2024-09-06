import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.tagsService.findOne(name);
  }

  @Get('sources/:name')
  getSources(@Param('name') name: string) {
    return this.tagsService.getSources(name);
  }

  @Get('quizs/:name')
  getQuizs(@Param('name') name: string) {
    return this.tagsService.getQuizs(name);
  }

  @Patch(':name')
  update(@Param('name') name: string) {
    return this.tagsService.patchSourcesAndQuizs(name);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return "N/A";
  }
}
