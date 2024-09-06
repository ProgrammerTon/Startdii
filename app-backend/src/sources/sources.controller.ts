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
  findByOffset(@Query() query: { offset: number }) {
    if (!query.offset) return this.sourcesService.findAll();
    const offset = query.offset;
    return this.sourcesService.findByOffset(offset);
  }

  @Get(':id')
  findById(@Param('id') id: ObjectId) {
    return this.sourcesService.findById(id);
  }

  @Get('searchname/:keyword')
  findByTitle(@Param('keyword') keyword: string) {
    return this.sourcesService.searchByTitle(keyword);
  }

  @Get('rating/:id')
  getRating(@Param('id') id: ObjectId) {
    return this.sourcesService.getRating(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSourceDto);
  }

  @Patch('rating/:id')
  userRating(@Param('id') id: ObjectId, @Body('score') score: number, @Body('raterId') raterId: ObjectId) {
    return this.sourcesService.userRating(id,score,raterId as ObjectId);
  }

  @Patch('reset/:id')
  dataReset(@Param('id') id: ObjectId) {
    return this.sourcesService.dataReset(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.sourcesService.delete(id);
  }
}
