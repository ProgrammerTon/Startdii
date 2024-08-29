import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument, Status } from './entities/quiz.entity';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';

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
    console.log(typeof quiz.questions)
    const createdQuiz = new this.quizModel(Quiz);
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
