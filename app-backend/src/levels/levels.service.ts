import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

@Injectable()
export class LevelsService {
  constructor(
  ) {}

  // --------------------------- Create ---------------------------

  //async create(createUserDto: CreateUserDto): Promise<User> {
  //  const user = plainToInstance(User, createUserDto);
  //  user.roles = [Role.Customer];
  //  user.password = await this.hashPassword(user.password);
  //  const createdUser = new this.userModel(user);
  //  return createdUser.save();
  //}

  // --------------------------- Get ---------------------------


  // --------------------------- Update ---------------------------


  // --------------------------- Misc. ---------------------------
  

}
