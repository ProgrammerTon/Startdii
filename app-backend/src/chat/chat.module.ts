import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Chat } from './entities/chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatSchema } from './entities/chat.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UsersModule,
  ],
  controllers: [ChatController],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
