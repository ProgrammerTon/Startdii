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

  // --------------------------- Update ---------------------------

  async addExp(userId: ObjectId, exp: number) {
    const user_lvl = await this.levelModel.findById(userId).exec();
    var old_exp = user_lvl.current_exp;
    var new_exp = old_exp + exp;
    user_lvl.current_exp = new_exp;
    return await this.levelModel
    .findByIdAndUpdate(userId, user_lvl)
    .exec();
  }

  // --------------------------- Misc. ---------------------------
  

}
