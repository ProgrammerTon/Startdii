import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source, SourceDocument } from './entities/source.entity';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from 'src/tags/entities/tag.entity';
import { Quiz, QuizDocument } from 'src/quizs/entities/quiz.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
  ) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = plainToInstance(Source, createSourceDto);
    source.ownerId = new ObjectId(source.ownerId);
    const createdSource = new this.sourceModel(source);
    await createdSource.save();
    this.addSourceFromTags(createdSource._id as ObjectId);
    return createdSource;
  }

  async delete(id: ObjectId): Promise<void> {
    await this.removeSourceFromTags(id);
    await this.sourceModel.findByIdAndDelete(id).exec();
  }

  async addSourceFromTags(id: ObjectId) {
    const source = await this.sourceModel.findById(id).exec();
    let tag;
    for (var i = 0; i < source.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: source.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: source.tags[i] });
      }
      tag.sources.push(id);
      tag.save();
    }
  }

  async removeSourceFromTags(id: ObjectId) {
    // Find the document by ID and apply the updates
    const source = await this.sourceModel.findById(id).exec();
    let tag;
    for (var i = 0; i < source.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: source.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: source.tags[i] });
      }
      tag.sources = tag.sources.filter(
        (element) => String(element) !== String(id),
      );
      tag.save();
    }
  }

  async update(
    id: ObjectId,
    updateSourceDto: UpdateSourceDto,
  ): Promise<Source> {
    this.removeSourceFromTags(id);

    const updatedSource = await this.sourceModel
      .findByIdAndUpdate(
        id,
        { $set: updateSourceDto },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();

    this.addSourceFromTags(updatedSource.id);
    // Return the updated document, or null if not found
    return updatedSource;
  }

  async findById(id: ObjectId): Promise<Source | null> {
    return this.sourceModel.findById(id).populate('ownerId', 'username').exec();
  }

  async findAll() {
    return this.sourceModel.find().exec();
  }

  async findByOffset(
    offset: number,
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<Source[] | null> {
    const size = 10;
    const sortValue = sortOrder === 'asc' ? 1 : -1;
    const sources = await this.sourceModel
      .find()
      .sort({ createdAt: sortValue })
      .populate('ownerId', 'username')
      .exec();
    offset--;
    offset *= size;
    return sources.slice(offset, offset + size);
  }

  async searchByTitle(keyword: string): Promise<Source[]> {
    return this.sourceModel.find({ $text: { $search: keyword } }).exec();
  }

  async findSourcesByTags(tags: string[]) {
    return this.sourceModel
      .find({
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .exec();
  }

  async findSourcesByTagsAndTitle(tags: string[], title: string) {
    return this.sourceModel
      .find({
        $text: { $search: title },
        $and: tags.map((tag) => ({
          tags: { $elemMatch: { $regex: new RegExp(tag, 'i') } },
        })),
      })
      .exec();
  }

  /*async findByTag(tagname: string): Promise<Source[]> {
    const sources = new Array<Source>();
    const tag = await this.tagModel.findOne({ name: tagname }).exec();
    if (tag) {
      for (let i = 0; i < tag.sources.length; i++) {
        sources.push(await this.sourceModel.findById(tag.sources[i]).exec());
      }
    }
    return sources;
  }*/
}
