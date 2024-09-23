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

  @Get(':chatId/note')
  getNotes(@Param(':chatId', ParseObjectIdPipe) chatId: ObjectId) {
    return this.chatService.getNotes(chatId);
  }

  @Get(':chatId/quiz')
  getQuizzes(@Param(':chatId', ParseObjectIdPipe) chatId: ObjectId) {
    return this.chatService.getQuizzes(chatId);
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
}
