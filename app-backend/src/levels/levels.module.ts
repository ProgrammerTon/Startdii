import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/users/entities/user.entity';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
@Module({
    imports: [
    ],
    controllers: [LevelsController],
    providers: [LevelsService],
  })
  export class LevelsModule {}