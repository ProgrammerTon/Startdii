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
    console.log(typeof quiz)
    const createdQuiz = new this.quizModel(quiz);
    let tag;
    for (let i = 0; i < createdQuiz.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: createdQuiz.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: createdQuiz.tags[i] });
      }
      tag.quizs.push(createdQuiz._id);
      tag.save();
    }
    return createdQuiz.save();
  }
  async findAll() {
    return this.quizModel.find().exec();
  }

  async isCorrect(id: ObjectId, qNo: number, ans: number[] | number): Promise<boolean> {
    const quiz = await this.quizModel.findById(id).exec();
    const answers = quiz.questions[qNo].answers;
    return ans == answers;
  }

  async addHistory(){
    
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
