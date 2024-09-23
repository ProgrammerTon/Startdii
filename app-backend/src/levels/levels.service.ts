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
    console.log(user_lvl,exp);
    user_lvl.current_exp += Number(exp);
    console.log(user_lvl);
    user_lvl = await this.levelUpCheck(user_lvl);
    //console.log(user_lvl);
    return user_lvl;
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
