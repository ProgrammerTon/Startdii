import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './entities/tag.entity';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Source, SourceDocument } from 'src/sources/entities/source.entity';
import { Quiz, QuizDocument } from 'src/quizs/entities/quiz.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = plainToInstance(Tag, createTagDto);
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  async findAll() {
    return this.tagModel.find().exec();
  }

  async findOne(name: string): Promise<Tag> {
    return await this.tagModel.findOne({ name: name });
  }

  async getSources(name: string) {
    return await this.tagModel.findOne({ name: name }).select('sources').populate('sources').exec();
  }

  async getQuizs(name: string) {
    return await this.tagModel.findOne({ name: name }).select('quizs').populate('quizs').exec();
  }

  // Remove all invalid sourceId(s) and quizId(s)
  async patchSourcesAndQuizs(name: string) {
    let tag = await this.tagModel.findOne({ name: name });
    let sources = tag.sources.slice();
    let quizs = tag.quizs.slice();
    for (var i = 0; i < sources.length; i++) {
      const source = await this.sourceModel.findById(sources[i]).exec();
      const quiz = await this.quizModel.findById(quizs[i]).exec();
      if (!source) {
        tag.sources = await tag.sources.filter(element => String(element) !== String(sources[i]))
      }
      if (!quiz) {
        tag.sources = await tag.quizs.filter(element => String(element) !== String(quizs[i]))
      }
    }
    return tag.save()
  }
}
