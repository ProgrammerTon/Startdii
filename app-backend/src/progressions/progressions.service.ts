import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Progression, ProgressionDocument } from './entities/progression.entity';
import { CreateProgressionDto } from './dto/create-progression.dto';
import { GoalsService } from 'src/goals/goals.service';
import { UsersService } from 'src/users/users.service';
import { Goal } from 'src/goals/entity/goal.entitiy';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProgressionsService {
  constructor(
    @InjectModel(Progression.name)
    private progressionModel: Model<ProgressionDocument>,
    private readonly goalsService: GoalsService,
		private readonly usersService: UsersService,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createProgressionDto: CreateProgressionDto, userId: ObjectId, goalId: ObjectId): Promise<Progression> {
    const progression = plainToInstance(Progression, createProgressionDto);
    progression.userId = userId;
		progression.goalId = goalId;
    const createdProgression = new this.progressionModel(progression);
    return createdProgression.save();
  } 

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.progressionModel.find().exec();
  }

  // --------------------------- Update ---------------------------

  @Cron('59 23 * * 0')
  async updateWeeklyGoal() {
		const {selected_easy_goals, selected_hard_goals} = await this.randomWeeklyGoal();
		const users = await this.usersService.findAll();
		this.progressionModel.deleteMany({}).exec();
		for (let i = 0; i < users.length; i++) {
			const createProgressionDto = {
				current_progress: 0,
			};
			for (let j = 0; j < selected_easy_goals.length; j++) {
				await this.create(createProgressionDto, users[i]._id as ObjectId, selected_easy_goals[j]._id as ObjectId);
			}
			for (let j = 0; j < selected_hard_goals.length; j++) {
				await this.create(createProgressionDto, users[i]._id as ObjectId, selected_hard_goals[j]._id as ObjectId);
			}
		}
  }

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
		const total_hard_goal_count = hard_goals.length;
		const total_easy_goal_count = easy_goals.length;
		var selected_easy_goals: any[] = [];
		var selected_hard_goals: any[] = [];
		var easy_goals_number: number[] = [];
		var hard_goals_number: number[] = [];
		while (selected_easy_goals.length < easy_count) {
			var sel = this.randomInt(1, total_easy_goal_count);
			if (!easy_goals_number.includes(sel)) {
				easy_goals_number.push(sel);
				selected_easy_goals.push(easy_goals[sel-1]);
			}
		}
		while (selected_hard_goals.length < hard_count) {
			var sel = this.randomInt(1, total_hard_goal_count);
			if (!hard_goals_number.includes(sel)) {
				hard_goals_number.push(sel);
				selected_hard_goals.push(hard_goals[sel-1]);
			}
		}
		return {selected_easy_goals, selected_hard_goals};
	}
}