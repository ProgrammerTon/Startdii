import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Level, LevelDocument } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class LevelsService {
  constructor(
    @InjectModel(Level.name)
    private levelModel: Model<LevelDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = plainToInstance(Level, createLevelDto);
    const createdUserLevel = new this.levelModel(level);
    return createdUserLevel.save();
  }

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.levelModel.find().exec();
  }

  async findUserLevel(userId: ObjectId) {
    const user_lvl = await this.levelModel.findOne({ ownerId: userId }).exec();
    if(user_lvl === null) {
      const createLevelDto: CreateLevelDto = {
        ownerId: userId
      };
      const new_user_lvl = this.create(createLevelDto);
      return new_user_lvl
    }
    else {
      return user_lvl;
    }
  }

  // --------------------------- Update ---------------------------

  async addExp(userId: ObjectId, exp: number) {
    var user_lvl = await this.findUserLevel(userId);
    user_lvl.current_exp += Number(exp);
    user_lvl = await this.levelUpCheck(user_lvl);
    //console.log(user_lvl);
    return user_lvl;
  }

  @Cron('59 23 * * 0')
  async updateWeeklyRatingExp() {
    const weekly_rating_exp_cap: number = 150;
		const users = await this.userModel.find({}).populate('sources').populate('quizzes').exec();
		for (let i = 0; i < users.length; i++) {
      const current_user: any = users[i];
			const user_lvl: any = await this.findUserLevel(current_user._id);
      const user_sources = current_user.sources;
      const user_quizzes = current_user.quizzes;
      var total_rating_exp = 0;
      for (let j = 0; j < user_sources.length; j++) {
        const current_source = user_sources[j];
        if (!current_source.avg_rating_score || !current_source.rating_count) {
          total_rating_exp += 0;
        }
        else {
          total_rating_exp += current_source.avg_rating_score * current_source.rating_count;
        }
      }
      for (let j = 0; j < user_quizzes.length; j++) {
        const current_quiz = user_quizzes[j];
        if (!current_quiz.avg_rating_score || !current_quiz.rating_count) {
          total_rating_exp += 0;
        }
        else {
          total_rating_exp += current_quiz.avg_rating_score * current_quiz.rating_count;
        }
      }
      if (total_rating_exp > weekly_rating_exp_cap) {
        total_rating_exp = weekly_rating_exp_cap;
      }
      user_lvl.current_rating_exp = total_rating_exp;
      await this.addExp(current_user._id, total_rating_exp);
      await this.levelModel.findByIdAndUpdate(user_lvl._id, {current_rating_exp: total_rating_exp});
    }
  }

  // --------------------------- Misc. ---------------------------

  async levelUpCheck(user_lvl) {
    const maxLevel: number = 50;
    const multiplier: number = 1.1;
    while (user_lvl.current_exp >= user_lvl.required_exp && user_lvl.level < maxLevel) {
      user_lvl.current_exp -= user_lvl.required_exp;
      user_lvl.level += 1;
      user_lvl.required_exp *= multiplier;
    }
    //console.log(user_lvl);
    return user_lvl.save();
  }
  
}
