import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Progression, ProgressionDocument } from './entities/progression.entity';
import { CreateProgressionDto } from './dto/create-progression.dto';

@Injectable()
export class ProgressionsService {
  constructor(
    @InjectModel(Progression.name)
    private progressionModel: Model<ProgressionDocument>,
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
    return this.progressionModel.find().exec();
  }

  // --------------------------- Update ---------------------------


  // --------------------------- Misc. ---------------------------

  
}