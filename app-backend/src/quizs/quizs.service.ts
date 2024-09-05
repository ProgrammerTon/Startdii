import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument, Status } from './entities/quiz.entity';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class QuizsService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = plainToInstance(Quiz, createQuizDto);
    quiz.published = Status.private;
    const createdQuiz = new this.quizModel(quiz);
    await createdQuiz.save();
    this.addQuizFromTags(createdQuiz._id as ObjectId);
    return createdQuiz;
  }

  async findAll() {
    return this.quizModel.find().exec();
  }

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

  async submitQuiz(id: ObjectId, userId: ObjectId, ans: (number | number[])[]) {
    console.log('calculating results');
    const results = await this.checkResults(id, ans);
    console.log('got results');
    return this.addHistory(id, userId, results);
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

  async addHistory(id: ObjectId, userId: ObjectId, res: boolean[]) {
    const quiz = await this.quizModel.findById(id).exec();
    const user = await this.userModel.findById(userId).exec();
    if (!quiz.players.includes(userId)) {
      quiz.players.push(userId);
      if (quiz.total_score)
        quiz.total_score += res.filter((value) => value).length;
      else quiz.total_score = res.filter((value) => value).length;
      for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i].correct)
          quiz.questions[i].correct += Number(res[i]);
        else quiz.questions[i].correct = Number(res[i]);
      }
      console.log(user);
      user.quiz_history.push({ id: id, results: res });
    }
    await this.quizModel
      .findByIdAndUpdate(
        id,
        { $set: quiz },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();
    await quiz.save();
    await user.save();
    return quiz;
  }

  async findById(id: ObjectId): Promise<Quiz | null> {
    return this.quizModel.findById(id).populate('ownerId', 'username').exec();
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
