import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag, TagSchema } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from 'src/sources/entities/source.entity';
import { Quiz, QuizSchema } from 'src/quizs/entities/quiz.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: Source.name, schema: SourceSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
