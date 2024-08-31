import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, Headers, Query} from '@nestjs/common';

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

  @Get(':referenceId')
  findAllByReferenceId(@Param('referenceId', ParseObjectIdPipe) refernceId: ObjectId,
                       @Query('option') option: string) {
    return this.commentsService.findAllByReferenceId(refernceId, option);
  }

  @Post(':referenceId')
  create(@Param('referenceId', ParseObjectIdPipe) referenceId: ObjectId,
         @Body() createCommentDto: CreateCommentDto,
         @Headers('x-user-id') ownerId: string,
         @Query('option') option: string) {
          
    createCommentDto.ownerId = new Types.ObjectId(ownerId);

    if (option === 'source') {
      createCommentDto.sourceId = referenceId;
    } else if (option === 'quiz') {
      createCommentDto.quizId = referenceId;
    }
    
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
