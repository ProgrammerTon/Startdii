import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Goal, GoalDocument } from './entity/goal.entitiy';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const goal = plainToInstance(Goal, createGoalDto);
    const createdGoal = new this.goalModel(goal);
    return createdGoal.save();
  } 

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.goalModel.find().exec();
  }

  // --------------------------- Update ---------------------------


  // --------------------------- Misc. ---------------------------

  
}