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
import { ObjectId } from 'mongodb';
import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Source')
@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

  @Get()
  findByOffset(@Query() query: {offset: number}) {
    if (!query.offset) return this.sourcesService.findAll();
    const offset = query.offset
    return this.sourcesService.findByOffset(offset);
  }

  @Get(':id')
  findById(@Param('id') id: ObjectId) {
    return this.sourcesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.sourcesService.delete(id);
  }

  

  @Get('search/:tagName')
  findByTag(@Param('tagName') tagName: string) {
    return this.sourcesService.findByTag(tagName);
  }

}
