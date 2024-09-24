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
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  findAll() {
    return this.chatService.findAll();
  }
  
  @Get(':chatId')
  findRecentChatOffset(
    @Query() query: { offset: number },
    @Param('chatId', ParseObjectIdPipe) chatId: ObjectId,
  ) {
    if (!query.offset) return this.chatService.findAll();
    const offset = query.offset;
    return this.chatService.findChatRoomByOffset(offset, chatId);
  }

  @Get(':chatId/source')
  findSourceChat(
    @Query() query: { offset: number },
    @Param('chatId', ParseObjectIdPipe) chatId: ObjectId,
  ) {
    if (!query.offset) return this.chatService.findAllSource(chatId);
    const offset = query.offset;
    return this.chatService.findSourceByOffset(offset, chatId);
  }

  @Get(':chatId/quiz')
  findQuizChat(
    @Query() query: { offset: number },
    @Param('chatId', ParseObjectIdPipe) chatId: ObjectId,
  ) {
    if (!query.offset) return this.chatService.findAllQuiz(chatId);
    const offset = query.offset;
    return this.chatService.findQuizByOffset(offset, chatId);
  }
}
