import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, Request, Query, UseGuards} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

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

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':referenceId')
  create(@Param('referenceId', ParseObjectIdPipe) referenceId: ObjectId,
         @Body() createCommentDto: CreateCommentDto,
         @Request() req,
         @Query('option') option: string) {
        
    createCommentDto.ownerId = new Types.ObjectId(req.user.id);
    
    if (option === 'source') {
      createCommentDto.sourceId = referenceId;
    } else if (option === 'quiz') {
      createCommentDto.quizId = referenceId;
    }
    
    return this.commentsService.create(createCommentDto);
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  createReplyComment(@Param('id', ParseObjectIdPipe) id: ObjectId,
                     @Body() createReplyCommentDto: CreateReplyCommentDto,
                     @Request() req) {
    createReplyCommentDto.ownerId = new Types.ObjectId(req.user.id);

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
