import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressionsService } from './progressions.service';
import { ProgressionsController } from './progressions.controller';
import { Progression, ProgressionSchema } from './entities/progression.entity';
import { GoalsService } from 'src/goals/goals.service';
import { GoalsController } from 'src/goals/goals.controller';
import { Goal, GoalSchema } from 'src/goals/entity/goal.entitiy';
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Progression.name, schema: ProgressionSchema },
        { name: Goal.name, schema: GoalSchema },
      ]),
    ],
    controllers: [ProgressionsController, GoalsController],
    providers: [ProgressionsService, GoalsService],
  })
  export class ProgressionsModule {}