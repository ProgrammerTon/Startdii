import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { Level, LevelSchema } from './entities/level.entity';
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Level.name, schema: LevelSchema },
      ]),
    ],
    controllers: [LevelsController],
    providers: [LevelsService],
    exports: [LevelsService],
  })
  export class LevelsModule {}