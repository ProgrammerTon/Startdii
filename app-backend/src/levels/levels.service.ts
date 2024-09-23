import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Level, LevelDocument } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectModel(Level.name)
    private levelModel: Model<LevelDocument>,
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
    const user_lvl = await this.levelModel.findById(userId).exec();
    if(user_lvl === null) {
      const createLevelDto: CreateLevelDto = {
        ownerId: userId,
        level: 0,
        current_exp: 0,
        required_exp: 25,
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
    const user_lvl = await this.findUserLevel(userId);
    var old_exp = user_lvl.current_exp;
    var new_exp = old_exp + exp;
    user_lvl.current_exp = new_exp;
    const updated_user_lvl = await this.levelUpCheck(user_lvl);
    return await this.levelModel
    .findByIdAndUpdate(userId, updated_user_lvl)
    .exec();
  }

  // --------------------------- Misc. ---------------------------

  async levelUpCheck(user_lvl: any) {
    var req_exp: number = user_lvl.required_exp;
    var cur_exp: number = user_lvl.current_exp;
    const multiplier: number = 1.1;
    if(cur_exp >= req_exp) {
      user_lvl.level += 1;
      user_lvl.cur_exp = cur_exp - req_exp;
      user_lvl.req_exp *= multiplier;
    }
    return user_lvl.save();
  }
  
}
