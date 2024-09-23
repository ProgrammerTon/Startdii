import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { Goal, GoalSchema } from './entity/goal.entitiy';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Goal.name, schema: GoalSchema },
      ]),
    ],
    controllers: [GoalsController],
    providers: [GoalsService],
  })
  export class GoalsModule {}