import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/common/pipes';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':sourceId')
  findBySourceId(@Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId) {
    return this.commentsService.findBySourceId(sourceId);
  }

  @Post(':ownerId/:sourceId')
  create(@Param("ownerId", ParseObjectIdPipe) ownerId: ObjectId,
         @Param("sourceId", ParseObjectIdPipe) sourceId: ObjectId,
         @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.ownerId = ownerId;
    createCommentDto.sourceId = sourceId;
    return this.commentsService.create(createCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.commentsService.remove(id);
  }
}
