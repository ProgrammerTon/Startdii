import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument, Status } from './entities/quiz.entity';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Chat, ChatDocument } from 'src/chat/entities/chat.entity';

@Injectable()
export class QuizsService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  // --------------------------- Create ---------------------------

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = plainToInstance(Quiz, createQuizDto);
    const owner = await this.userModel.findById(quiz.ownerId).exec();
    quiz.published = Status.private;
    quiz.ownerId = new Types.ObjectId(quiz.ownerId);
    const createdQuiz = new this.quizModel(quiz);
    await createdQuiz.save();
    this.addQuizFromTags(createdQuiz._id as ObjectId);
    owner.quizzes.push(createdQuiz._id as ObjectId);
    await owner.save();
    return createdQuiz;
  }

  // --------------------------- Get ---------------------------

  async findAll() {
    return this.quizModel.find().exec();
  }

  async findByOffset(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    sortField: 'createdAt' | 'avg_rating_score',
  ): Promise<Quiz[] | null> {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const quizs = await this.quizModel
      .find()
      .select(
        '-updatedAt -questions -rating -playing_scores -players -description -total_score -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
    offset--;
    offset *= size;
    const transformedQuizs = quizs.slice(offset, offset + size).map((quiz) => {
      const rating = quiz.rating || []; // Ensure 'rating' exists
      const totalScore = rating.reduce((sum, r) => sum + r.score, 0); // Calculate total score
      const averageScore = rating.length ? totalScore / rating.length : 0; // Calculate average score
      const quizObj = quiz.toObject();
      delete quizObj.rating;
      return {
        ...quizObj, // Convert Mongoose document to plain object
        averageScore, // Add averageScore
      };
    });
    return transformedQuizs;
  }

  async findById(id: ObjectId): Promise<Quiz | null> {
    const quiz = await this.quizModel
      .findById(id)
      .populate('ownerId', 'username')
      .exec();
    const rating = quiz.rating || []; // Ensure 'rating' exists
    const totalScore = rating.reduce((sum, r) => sum + r.score, 0); // Calculate total score
    const averageScore = rating.length ? totalScore / rating.length : 0; // Calculate average score
    const quizObj = quiz.toObject();
    delete quizObj.rating;
    const transformedSources = {
      ...quizObj,
      count: rating.length,
      averageScore,
    };
    return transformedSources;
    // return this.quizModel.findById(id).populate('ownerId', 'username').exec();
  }

  async getRating(id: ObjectId) {
    const obj = await this.quizModel.findById(id).exec();
    const rating = obj.rating;
    const totalScore = rating.reduce((sum, r) => sum + r.score, 0);
    const averageScore = rating.length ? totalScore / rating.length : 0;
    return { Rating: averageScore, Count: rating.length };
  }

  // --------------------------- Update ---------------------------

  async update(id: ObjectId, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return this.quizModel
      .findByIdAndUpdate(id, updateQuizDto, { new: true })
      .exec();
  }

  async updateRatingScores() {
    let objs = await this.quizModel.find().exec();
    let rating;
    for (let i = 0; i < objs.length; i++) {
      rating = await this.getRating(objs[i]._id as ObjectId);
      objs[i].avg_rating_score = rating.Rating;
      objs[i].rating_count = rating.Count;
      objs[i].save();
    }
    return objs;
  }

  async addHistory(
    id: ObjectId,
    userId: ObjectId,
    res: boolean[],
    ans: (number | number[])[],
  ) {
    let quiz = await this.quizModel.findById(id).exec();
    let user = await this.userModel.findById(userId).exec();
    const score = res.reduce((sum, r) => sum + Number(r), 0);
    if (!quiz.players.includes(userId)) {
      quiz.players.push(userId);
      if (quiz.total_score)
        quiz.total_score += res.filter((value) => value).length;
      else quiz.total_score = res.filter((value) => value).length;
      quiz.playing_scores.push(score);
      for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i].correct)
          quiz.questions[i].correct += Number(res[i]);
        else quiz.questions[i].correct = Number(res[i]);
      }

      user.quiz_history.push({ id: id, results: res, answers: ans });
    }
    await this.quizModel
      .findByIdAndUpdate(
        id,
        { $set: quiz },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();
    await user.save();
    return quiz;
  }

  async submitQuiz(id: ObjectId, userId: ObjectId, ans: (number | number[])[]) {
    //console.log('calculating results');
    const results = await this.checkResults(id, ans);
    //console.log('got results');
    return this.addHistory(id, userId, results, ans);
  }

  async userRating(id: ObjectId, score: number, raterId: ObjectId) {
    const obj = await this.quizModel.findById(id).exec();
    obj.rating = obj.rating.filter(
      (r) => r.raterId.toString() !== raterId.toString(),
    );
    obj.rating.push({ raterId: raterId, score: score });
    await obj.save();
    let rating_score = await this.getRating(id);
    obj.avg_rating_score = rating_score.Rating;
    obj.rating_count = rating_score.Count;
    return await obj.save();
  }

  async dataReset(id: ObjectId) {
    const obj = await this.quizModel.findById(id).exec();
    let user;
    for (let p = 0; p < obj.players.length; p++) {
      let pid = obj.players[p];
      user = await this.userModel.findById(pid).exec();
      user.quiz_history = user.quiz_history.filter(
        (element) => element.id.toString() !== id.toString(),
      );
      await this.userModel
        .findByIdAndUpdate(
          pid,
          { $set: user },
          { new: true, useFindAndModify: false }, // Return the updated document
        )
        .exec();
    }
    obj.players = [];
    obj.total_score = 0;
    obj.rating = [];
    obj.playing_scores = [];
    for (let q = 0; q < obj.questions.length; q++) {
      obj.questions[q].correct = 0;
    }

    await this.quizModel
      .findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();
    return obj;
  }

  // --------------------------- Delete ---------------------------

  async remove(id: ObjectId) {
    await this.removeQuizFromTags(id);
    await this.removeQuizFromUsers(id);
    await this.deleteChatWithQuizId(id);
    await this.quizModel.findByIdAndDelete(id);
  }

  // --------------------------- Misc. ---------------------------

  async arrayMatching(a1: any[], a2: any[]): Promise<boolean> {
    if (a1.length == a2.length) {
      let ans = true;
      for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
          ans = false;
          break;
        }
      }
      return ans;
    }
    return false;
  }

  async checkResults(id: ObjectId, ans: (number | number[])[]) {
    const results: boolean[] = [];
    const quiz = await this.quizModel.findById(id).exec();
    for (let i = 0; i < quiz.questions.length; i++) {
      if (
        typeof ans[i] == 'object' &&
        typeof quiz.questions[i].answers == 'object'
      ) {
        results.push(
          await this.arrayMatching(
            ans[i] as number[],
            quiz.questions[i].answers as number[],
          ),
        );
      } else results.push(quiz.questions[i].answers == ans[i]);
    }
    return results;
  }

  async addQuizFromTags(id: ObjectId) {
    const quiz = await this.quizModel.findById(id).exec();
    let tag;
    for (let i = 0; i < quiz.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: quiz.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: quiz.tags[i] });
      }
      tag.quizs.push(id);
      tag.save();
    }
  }

  async removeQuizFromTags(id: ObjectId) {
    // Find the document by ID and apply the updates
    const quiz = await this.quizModel.findById(id).exec();
    let tag;
    for (let i = 0; i < quiz.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: quiz.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: quiz.tags[i] });
      }
      tag.quizs = tag.quizs.filter((element) => String(element) !== String(id));
      tag.save();
    }
  }

  async removeQuizFromUsers(id: ObjectId) {
    id = new Types.ObjectId(id);
    await this.userModel
      .updateMany({ favorite_quizzes: id }, { $pull: { favorite_quizzes: id } })
      .exec();
    await this.userModel
      .updateMany({ quizzes: id }, { $pull: { quizzes: id } })
      .exec();
    await this.userModel
      .updateMany(
        { 'quiz_history.id': id },
        { $pull: { quiz_history: { id: id } } },
      )
      .exec();
    let sid = id.toString();
    await this.userModel
      .updateMany(
        { 'quiz_history.id': sid },
        { $pull: { quiz_history: { id: sid } } },
      )
      .exec();
  }

  async deleteChatWithQuizId(id: ObjectId) {
    id = new Types.ObjectId(id);
    await this.chatModel.deleteMany({ quizId: id }).exec();
  }

  async findByOffsetWithTitle(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    title: string,
    sortField: 'createdAt' | 'avg_rating_score',
  ): Promise<Quiz[] | null> {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const quizzes = await this.quizModel
      .find({ $text: { $search: title } })
      .select(
        '-updatedAt -questions -rating -playing_scores -players -description -total_score -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
    const transformedSources = quizzes.map((quiz) => {
      const rating = quiz.rating || []; // Ensure 'rating' exists
      const totalScore = rating.reduce((sum, r) => sum + r.score, 0); // Calculate total score
      const averageScore = rating.length ? totalScore / rating.length : 0; // Calculate average score
      const quizObj = quiz.toObject();
      delete quizObj.rating;
      return {
        ...quizObj, // Convert Mongoose document to plain object
        averageScore, // Add averageScore
      };
    });
    return transformedSources;
  }

  async searchByTitle(keyword: string): Promise<Quiz[]> {
    return this.quizModel.find({ $text: { $search: keyword } }).exec();
  }

  async findQuizsByTags(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    tags: string[],
    sortField: 'createdAt' | 'avg_rating_score',
  ) {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    return this.quizModel
      .find({
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .select(
        '-updatedAt -questions -rating -playing_scores -players -description -total_score -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
  }

  async findQuizsByTagsAndTitle(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
    tags: string[],
    title: string,
    sortField: 'createdAt' | 'avg_rating_score',
  ) {
    const size = 10;
    const skip = (offset - 1) * size;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    return this.quizModel
      .find({
        $text: { $search: title },
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .select(
        '-updatedAt -questions -rating -playing_scores -players -description -total_score -rating_count',
      )
      .sort({ [sortField]: sortValue })
      .skip(skip)
      .limit(size)
      .populate('ownerId', 'username')
      .exec();
  }
}
