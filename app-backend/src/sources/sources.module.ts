import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from './entities/source.entity';
import { Tag, TagSchema } from 'src/tags/entities/tag.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Source.name, schema: SourceSchema },
      { name: Tag.name, schema: TagSchema },
      { name: User.name, schema: UserSchema },
    ]),
    TagsModule,
  ],
  controllers: [SourcesController],
  providers: [SourcesService],
})
export class SourcesModule {}
