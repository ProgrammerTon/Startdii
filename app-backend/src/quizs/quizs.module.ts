import { Module } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { QuizsController } from './quizs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './entities/quiz.entity';
import { Tag, TagSchema } from 'src/tags/entities/tag.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { TagsModule } from 'src/tags/tags.module';
import { Chat, ChatSchema } from 'src/chat/entities/chat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Tag.name, schema: TagSchema },
      { name: User.name, schema: UserSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
    TagsModule,
  ],
  controllers: [QuizsController],
  providers: [QuizsService],
})
export class QuizsModule {}
