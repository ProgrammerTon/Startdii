import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from 'src/sources/entities/source.entity';
import { ChatList, ChatListSchema } from './entities/chatlist.entity';
import { ChatListService } from './chatlist.service';
import { GuildsModule } from 'src/guilds/guilds.module';
import { Quiz, QuizSchema } from 'src/quizs/entities/quiz.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Source.name, schema: SourceSchema },
      { name: ChatList.name, schema: ChatListSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
    GuildsModule,
  ],
  providers: [UsersService, ChatListService],
  exports: [UsersService, ChatListService],
  controllers: [UsersController],
})
export class UsersModule {}
