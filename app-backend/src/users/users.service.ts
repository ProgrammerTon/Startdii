import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Role, UserDocument } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Source, SourceDocument } from 'src/sources/entities/source.entity';
import { ObjectId } from 'mongodb';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, createUserDto);
    user.roles = [Role.Customer];
    user.password = await this.hashPassword(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByExactUsername(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async findByUsername(username: string) {
    const users = await this.userModel
      .find({
        username: { $regex: username, $options: 'i' },
      })
      .populate({
        path: 'quiz_history.id',
      })
      .populate({
        path: 'favorite_sources',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .exec();
    const transformedUsers = users.map((user) => {
      const x = user.quiz_history.map((entry) => ({
        quiz: entry.id, // Renamed field
        results: entry.results,
      }));

      return {
        ...user.toObject(),
        quiz_history: x, // Use the transformed data
      };
    });

    return transformedUsers;
    // const user = await this.userModel
    //   .findOne({ username })
    //   .populate({
    //     path: 'quiz_history.id',
    //   })
    //   .populate({
    //     path: 'favorite_sources',
    //     populate: {
    //       path: 'ownerId',
    //       select: 'username',
    //     },
    //   })
    //   .exec();
    // const x = user.quiz_history.map((entry) => ({
    //   quiz: entry.id, // Renamed field
    //   results: entry.results,
    // }));
    // const transformedUser = {
    //   ...user.toObject(),
    //   quiz_history: x, // Use the transformed data
    // };
    // return transformedUser;
  }

  async getSources(ownerId: ObjectId) {
    return await this.userModel
      .findById(ownerId)
      .select('sources')
      .populate('sources')
      .exec();
  }

  async getQuizzes(ownerId: ObjectId) {
    return await this.userModel
      .findById(ownerId)
      .select('quizzes')
      .populate('quizzes')
      .exec();
  }

  async getFavoriteSources(userId: ObjectId) {
    return await this.userModel
      .findById(userId)
      .select('favorite_sources')
      .populate('favorite_sources')
      .exec();
  }

  async getFavoriteQuizzes(userId: ObjectId) {
    return await this.userModel
      .findById(userId)
      .select('favorite_quizzes')
      .populate('favorite_quizzes')
      .exec();
  }

  // --------------------------- Update ---------------------------
  async addFavoriteSource(id: ObjectId, sourceId: ObjectId) {
    const user = await this.userModel.findById(id).exec();
    if (!user.favorite_sources.includes(sourceId)) {
      user.favorite_sources.push(sourceId);
    }
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  async removeFavoriteSource(id: ObjectId, sourceId: ObjectId) {
    const user = await this.userModel.findById(id).exec();
    user.favorite_sources = user.favorite_sources.filter(
      (element) => String(element) !== String(sourceId),
    );
    console.log(sourceId);
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  async addFavoriteQuiz(id: ObjectId, quizId: ObjectId) {
    const user = await this.userModel.findById(id).exec();
    if (!user.favorite_quizzes.includes(quizId)) {
      user.favorite_quizzes.push(quizId);
    }
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  async removeFavoriteQuiz(id: ObjectId, quizId: ObjectId) {
    const user = await this.userModel.findById(id).exec();
    user.favorite_quizzes = user.favorite_quizzes.filter(
      (element) => String(element) !== String(quizId),
    );
    console.log(quizId);
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }

  // --------------------------- Misc. ---------------------------

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      password = await bcrypt.hash(password, saltRounds);
      return password;
    } catch (error) {
      console.log(error);
    }
  }
}
