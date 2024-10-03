import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import {
  Progression,
  ProgressionDocument,
} from './entities/progression.entity';
import { CreateProgressionDto } from './dto/create-progression.dto';
import { GoalsService } from 'src/goals/goals.service';
import { UsersService } from 'src/users/users.service';
import { Goal, GoalDocument, GoalType } from 'src/goals/entity/goal.entitiy';
import { Cron } from '@nestjs/schedule';
import { LevelsService } from 'src/levels/levels.service';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class ProgressionsService {
  constructor(
    @InjectModel(Progression.name)
    private progressionModel: Model<ProgressionDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>,
    private readonly goalsService: GoalsService,
    private readonly levelsService: LevelsService,
  ) {}

  // --------------------------- Create ---------------------------

  async create(
    createProgressionDto: CreateProgressionDto,
    userId: ObjectId,
    goalId: ObjectId,
  ): Promise<Progression> {
    const progression = plainToInstance(Progression, createProgressionDto);
    progression.userId = userId;
    progression.goalId = goalId;
    const createdProgression = new this.progressionModel(progression);
    return createdProgression.save();
  }

  async createGoalForNewUser(userId: ObjectId) {
    const goals = await this.goalModel.find({});
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].is_weekly_quest === true) {
        const createProgressionDto = {
          current_progress: 0,
        };
        await this.create(
          createProgressionDto,
          userId as ObjectId,
          goals[i]._id as ObjectId,
        );
      }
    }
  }

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.progressionModel.find().exec();
  }

  async findUserGoal(userId: ObjectId) {
    const user_goal = await this.progressionModel
      .find({ userId: userId })
      .populate('goalId')
      .exec();
    return user_goal;
  }

  // --------------------------- Update ---------------------------

  @Cron('59 23 * * 0')
  async updateWeeklyGoal() {
    const { selected_easy_goals, selected_hard_goals } =
      await this.randomWeeklyGoal();
    const users = await this.userModel.find({});
    await this.progressionModel.deleteMany({}).exec();
    for (let i = 0; i < users.length; i++) {
      const createProgressionDto = {
        current_progress: 0,
      };
      for (let j = 0; j < selected_easy_goals.length; j++) {
        await this.create(
          createProgressionDto,
          users[i]._id as ObjectId,
          selected_easy_goals[j]._id as ObjectId,
        );
      }
      for (let j = 0; j < selected_hard_goals.length; j++) {
        await this.create(
          createProgressionDto,
          users[i]._id as ObjectId,
          selected_hard_goals[j]._id as ObjectId,
        );
      }
    }
  }

  async updateProgress(userId: ObjectId, goalType: GoalType) {
    const total_goal_count = 3;
    var current_goal_count = 0;
    const complete_all_goal_xp = 45;
    const user_progresses: any = await this.progressionModel
      .find({ userId: userId })
      .populate('goalId')
      .exec();
    for (let i = 0; i < user_progresses.length; i++) {
      const current_progress_id: ObjectId = user_progresses[i]._id;
      if (
        user_progresses[i].goalId.type === goalType &&
        user_progresses[i].current_progress <
          user_progresses[i].goalId.objective_count
      ) {
        await this.progressionModel
          .findByIdAndUpdate(current_progress_id, {
            $inc: { current_progress: 1 },
          })
          .exec();
        current_goal_count +=
          await this.checkGoalCompletion(current_progress_id);
      }
    }
    if (current_goal_count === total_goal_count) {
      await this.levelsService.addExp(userId, complete_all_goal_xp);
    }
    //console.log(user_progresses);
  }

  async checkGoalCompletion(progressionId: ObjectId) {
    const progression: any = await this.progressionModel
      .findById(progressionId)
      .populate('goalId')
      .exec();
    var expToAdd: number = 0;
    if (progression.current_progress === progression.goalId.objective_count) {
      if (progression.goalId.difficulty === 'hard') {
        expToAdd = 50;
      } else if (progression.goalId.difficulty === 'easy') {
        expToAdd = 20;
      }
      await this.levelsService.addExp(progression.userId, expToAdd);
      return 1;
    }
    return 0;
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
      } else if (goals[i].difficulty === 'easy') {
        easy_goals.push(goals[i]);
      }
      await this.goalModel
        .findByIdAndUpdate(goals[i]._id, { is_weekly_quest: false })
        .exec();
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
        selected_easy_goals.push(easy_goals[sel - 1]);
        await this.goalModel
          .findByIdAndUpdate(easy_goals[sel - 1]._id, { is_weekly_quest: true })
          .exec();
      }
    }
    while (selected_hard_goals.length < hard_count) {
      var sel = this.randomInt(1, total_hard_goal_count);
      if (!hard_goals_number.includes(sel)) {
        hard_goals_number.push(sel);
        selected_hard_goals.push(hard_goals[sel - 1]);
        await this.goalModel
          .findByIdAndUpdate(hard_goals[sel - 1]._id, { is_weekly_quest: true })
          .exec();
      }
    }
    return { selected_easy_goals, selected_hard_goals };
  }
}
