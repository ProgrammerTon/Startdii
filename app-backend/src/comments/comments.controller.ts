import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, Headers} from '@nestjs/common';

import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

import { ParseObjectIdPipe } from 'src/common/pipes';
import { CommentsService } from './comments.service';
import { CreateCommentDto, CreateReplyCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':sourceId')
  findAllBySourceId(@Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId) {
    return this.commentsService.findAllBySourceId(sourceId);
  }

  @Post(':sourceId')
  create(@Param('sourceId', ParseObjectIdPipe) sourceId: ObjectId,
         @Body() createCommentDto: CreateCommentDto,
         @Headers('x-user-id') ownerId: string) {
    createCommentDto.ownerId = new Types.ObjectId(ownerId);
    createCommentDto.sourceId = sourceId;

    return this.commentsService.create(createCommentDto);
  }

  @Patch(':id')
  createReplyComment(@Param('id', ParseObjectIdPipe) id: ObjectId,
                     @Body() createReplyCommentDto: CreateReplyCommentDto,
                     @Headers('x-user-id') ownerId: string) {
    createReplyCommentDto.ownerId = new Types.ObjectId(ownerId);

    return this.commentsService.createReplyComment(id, createReplyCommentDto);
  }

  @Patch(':id/:replyCommentId')
  removeReplyComment(@Param('id', ParseObjectIdPipe) id: ObjectId,
                     @Param('replyCommentId') replyCommentId: string) {
    return this.commentsService.removeReplyComment(id, replyCommentId);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.commentsService.remove(id);
  }
}
