import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Role, UserDocument } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Source, SourceDocument } from 'src/sources/entities/source.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, createUserDto);
    user.roles = [Role.Customer];
    user.password = await this.hashPassword(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      password = await bcrypt.hash(password, saltRounds);
      return password;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findSourcesByUserId(ownerId: ObjectId) {
    const userId = new Types.ObjectId(ownerId);
    return await this.sourceModel.find({ ownerId: userId }).exec();
  }

  async addFavoriteSource(id: ObjectId, sourceId: ObjectId) {
    id = new Types.ObjectId(id);
    sourceId = new Types.ObjectId(sourceId);
    const user = await this.userModel.findById(id).exec();
    if (!user.favorite_sources.includes(sourceId)) {
      user.favorite_sources.push(sourceId);
    }
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  async removeFavoriteSource(id: ObjectId, sourceId: ObjectId) {
    id = new Types.ObjectId(id);
    sourceId = new Types.ObjectId(sourceId);
    const user = await this.userModel.findById(id).exec();
    user.favorite_sources = user.favorite_sources.filter(
      (element) => String(element) !== String(sourceId),
    );
    console.log(sourceId);
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }
}
