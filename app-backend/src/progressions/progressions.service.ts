import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Progression, ProgressionDocument } from './entities/progression.entity';
import { CreateProgressionDto } from './dto/create-progression.dto';
import { GoalsService } from 'src/goals/goals.service';
import { Goal } from 'src/goals/entity/goal.entitiy';

@Injectable()
export class ProgressionsService {
  constructor(
    @InjectModel(Progression.name)
    private progressionModel: Model<ProgressionDocument>,
    private readonly goalsService: GoalsService,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createProgressionDto: CreateProgressionDto, userId: ObjectId): Promise<Progression> {
    const progression = plainToInstance(Progression, createProgressionDto);
    progression.userId = userId;
    const createdProgression = new this.progressionModel(progression);
    return createdProgression.save();
  } 

  // --------------------------- Get ---------------------------

  async findAll() {
    this.randomWeeklyGoal();
    return this.progressionModel.find().exec();
  }

  // --------------------------- Update ---------------------------


  // --------------------------- Misc. ---------------------------

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async randomWeeklyGoal() {
    const goals = await this.goalsService.findAll();
    var hard_goals: any[] = [];
    var easy_goals: any[] = [];
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].difficulty === 'hard') {
            hard_goals.push(goals[i]);
        }
        else if (goals[i].difficulty === 'easy') {
            easy_goals.push(goals[i]);
        } 
    }
    const easy_count = 2;
    const hard_count = 1;
    var selected_easy_goals: any[] = [];
    var selected_hard_goals: any[] = [];
    while (selected_easy_goals.length < easy_count) {
        const sel = this.randomInt(0, easy_count);
        if (easy_goals[sel] in selected_easy_goals === false) {
            selected_easy_goals.push(easy_goals[sel]);
        }
    }
    while (selected_hard_goals.length < hard_count) {
        const sel = this.randomInt(0, hard_count);
        if (hard_goals[sel] in selected_hard_goals === false) {
            selected_hard_goals.push(hard_goals[sel]);
        }
    }
    console.log('hard', selected_hard_goals);
    console.log('easy', selected_easy_goals);
  }
  
}