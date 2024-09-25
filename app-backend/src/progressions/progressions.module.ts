import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProgressionsService } from './progressions.service';
import { ProgressionsController } from './progressions.controller';
import { Progression, ProgressionSchema } from './entities/progression.entity';

import { Goal, GoalSchema } from 'src/goals/entity/goal.entitiy';

import { User, UserSchema } from 'src/users/entities/user.entity';
import { GoalsModule } from 'src/goals/goal.module';
import { UsersModule } from 'src/users/users.module';
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Progression.name, schema: ProgressionSchema },
        { name: Goal.name, schema: GoalSchema },
        { name: User.name, schema: UserSchema },
      ]),
      GoalsModule,
      UsersModule,
    ],
    controllers: [ProgressionsController],
    providers: [ProgressionsService],
  })
  export class ProgressionsModule {}