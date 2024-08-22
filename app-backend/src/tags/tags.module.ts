import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag, TagSchema } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
