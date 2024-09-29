import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Role, UserDocument } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Source, SourceDocument } from 'src/sources/entities/source.entity';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Quiz, QuizDocument } from 'src/quizs/entities/quiz.entity';
import { Chat, ChatDocument } from 'src/chat/entities/chat.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
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

  async getAnswer(userId: ObjectId, quizId: string) {
    const user = await this.findById(userId);
    const quiz = user.quiz_history.find((item) => (item.id as any) === quizId);
    if (quiz) {
      const { results, answers } = quiz;
      return { results, answers };
    } else {
      return null;
    }
  }

  async getQuizHistory(userId: string) {
    const userfind = new Types.ObjectId(userId);
    const user = await this.userModel
      .findById(userfind)
      .populate({
        path: 'quiz_history.id',
        select: 'title tags avg_rating_score createdAt ownerId',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .exec();
    const quizzes = user.quiz_history.map((quizEntry) => quizEntry.id[0]);
    return quizzes;
  }

  async findById(userId: ObjectId) {
    return this.userModel.findById(userId);
  }

  async findAll() {
    const user = await this.userModel
      .findById(new Types.ObjectId('66cf16772bd720377e20a4bd'))
      .exec();
    console.log(user);
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

  async getOtherProfile(userId: ObjectId) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async getSources(ownerId: ObjectId, searchTitle: string) {
    const { sources }: any = await this.userModel
      .findById(ownerId)
      .select('sources')
      .populate({
        path: 'sources',
        select:
          '-updatedAt -description -content -filename -originalname -rating -rating_count',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .exec();
    if (searchTitle !== '') {
      const regex = new RegExp(searchTitle, 'i');
      const result = sources.filter((item) => regex.test(item.title));
      return result;
    }
    return sources;
    // return await this.userModel
    //   .findById(ownerId)
    //   .select('sources')
    //   .populate('sources', '-rating -filename -originalname')
    //   .exec();
  }

  async getQuizzes(ownerId: ObjectId, searchTitle: string) {
    const { quizzes }: any = await this.userModel
      .findById(ownerId)
      .select('quizzes')
      .populate({
        path: 'quizzes',
        select:
          '-updatedAt -questions -rating -playing_scores -players -description -total_score -rating_count',
        populate: {
          path: 'ownerId',
          select: 'username',
        },
      })
      .exec();
    if (searchTitle !== '') {
      const regex = new RegExp(searchTitle, 'i');
      const result = quizzes.filter((item) => regex.test(item.title));
      return result;
    }
    return quizzes;
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

  async getSourceRating(userId: ObjectId, oid: ObjectId) {
    let obj = await this.sourceModel.findById(oid);
    obj.rating = obj.rating.filter(
      (rating) => rating.raterId.toString() === userId.toString(),
    );
    return obj.rating.length > 0 ? obj.rating[0].score : 0;
  }

  async getQuizRating(userId: ObjectId, oid: ObjectId) {
    let obj = await this.quizModel.findById(oid);
    obj.rating = obj.rating.filter(
      (rating) => rating.raterId.toString() === userId.toString(),
    );
    return obj.rating.length > 0 ? obj.rating[0].score : 0;
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

  // --------------------------- Update ---------------------------
  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();

    // Return the updated document, or null if not found
    return updatedUser;
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
