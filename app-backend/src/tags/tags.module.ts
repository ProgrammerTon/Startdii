import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag, TagSchema } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from 'src/sources/entities/source.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema },
    { name: Source.name, schema: SourceSchema },
  ])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
