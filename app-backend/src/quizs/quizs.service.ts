import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument, Status } from './entities/quiz.entity';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class QuizsService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
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

  async arrayMatching(a1: any[], a2: any[]): Promise<number> {
    if (a1.length == a2.length) {
      let ans = 1;
      for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]){
          ans = 0; break;
        }
      }
      return ans;
    }
    return 0;
  }

  async countScore(id: ObjectId, ans: (number | number[])[]) {
    let result = "result: "
    let score = 0;
    const quiz = await this.quizModel.findById(id).exec();
    for (let i = 0; i < quiz.questions.length; i++) {
      if (typeof ans[i] == "object" && typeof quiz.questions[i].answers == "object"){
        score += await this.arrayMatching(ans[i] as number[],quiz.questions[i].answers as number[]);
      } else
        score += Number(quiz.questions[i].answers == ans[i]);
    }
    result += score + "/" + ans.length;
    return result;
  }

  async addQuizFromTags(id: ObjectId){
    const quiz = await this.quizModel.findById(id).exec();
    let tag;
    for (var i = 0; i < quiz.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: quiz.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: quiz.tags[i] });
      }
      tag.quizs.push(id);
      tag.save();
    }
  }

  async removeQuizFromTags(id: ObjectId){
    // Find the document by ID and apply the updates
    const quiz = await this.quizModel.findById(id).exec();
    let tag;
    for (var i = 0; i < quiz.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: quiz.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: quiz.tags[i] });
      }
      tag.quizs = tag.quizs.filter(
        (element) => String(element) !== String(id),
      );
      tag.save();
    }
  }

  async addHistory(){
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
