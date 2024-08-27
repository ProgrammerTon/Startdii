import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from './entities/source.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }]),
  ],
  controllers: [SourcesController],
  providers: [SourcesService],
})
export class SourcesModule {}
