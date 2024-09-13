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
import { SearchSourceDto } from './dto/search-source.dto';
import { TagsService } from 'src/tags/tags.service';

@ApiTags('Source')
@Controller('sources')
export class SourcesController {
  constructor(
    private readonly sourcesService: SourcesService,
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto);
  }

 @Get()
  findByOffset(
    @Query()
    query: {
      offset: number;
      sortOrder: 'asc' | 'desc';
      title: string | null;
      tags: string;
    },
  ) {
    if (!query.offset) return this.sourcesService.findAll();
    const offset = query.offset;
    const sortOrder = query.sortOrder;
    if (!query.title && query.tags.length === 2) {
      return this.sourcesService.findByOffset(offset, sortOrder);
    }
    const title = query.title;
    if (title && query.tags.length === 2) {
      return this.sourcesService.findByOffsetWithTitle(
        offset,
        sortOrder,
        title,
      );
    }
    const tagsTransform = query.tags
      .slice(1, query.tags.length - 1)
      .split(',')
      .map((tag) => {
        return tag.trim();
      });
    if (title && query.tags.length !== 2) {
      return this.sourcesService.findSourcesByTagsAndTitle(
        tagsTransform,
        title,
      );
    }
    if (query.tags.length !== 2) {
      return this.sourcesService.findSourcesByTags(tagsTransform);
    }
  }

  @Get('search')
  findByTitle(@Body() searchSourceDto: SearchSourceDto) {
    if (searchSourceDto.tags.length === 0) {
      return this.sourcesService.searchByTitle(searchSourceDto.title);
    }
    if (!searchSourceDto.title && searchSourceDto.tags.length === 1) {
      return this.tagsService.getSources(searchSourceDto.tags[0]);
    }
    if (!searchSourceDto.title) {
      return this.sourcesService.findSourcesByTags(searchSourceDto.tags);
    }
    return this.sourcesService.findSourcesByTagsAndTitle(
      searchSourceDto.tags,
      searchSourceDto.title,
    );
  }

  @Get(':id')
  findById(@Param('id') id: ObjectId) {
    return this.sourcesService.findById(id);
  }

  @Get(':id/rating')
  getRating(@Param('id') id: ObjectId) {
    return this.sourcesService.getRating(id);
  }

  @Patch('rating')
  updateRatingScores() {
    return this.sourcesService.updateRatingScores();
  }
  
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSourceDto);
  }

  

  @Patch(':id/rating')
  userRating(
    @Param('id') id: ObjectId,
    @Body('score') score: number,
    @Body('raterId') raterId: ObjectId,
  ) {
    return this.sourcesService.userRating(id, score, raterId as ObjectId);
  }

  @Patch(':id/reset')
  dataReset(@Param('id') id: ObjectId) {
    return this.sourcesService.dataReset(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.sourcesService.delete(id);
  }
}
