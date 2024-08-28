import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source, SourceDocument } from './entities/source.entity';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source.name)
    private sourceModel: Model<SourceDocument>,
    @InjectModel(Tag.name)
    private tagModel: Model<Tag>,
  ) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = plainToInstance(Source, createSourceDto);
    source.ownerId = new ObjectId(source.ownerId);
    const createdSource = new this.sourceModel(source);
    let tag;
    for (let i = 0; i < createdSource.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: createdSource.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: createdSource.tags[i] });
      }
      tag.sources.push(createdSource._id);
      tag.save();
    }
    return createdSource.save();
  }

  async delete(id: ObjectId): Promise<void> {
    await this.sourceModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: ObjectId,
    updateSourceDto: UpdateSourceDto,
  ): Promise<Source> {
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

    const updatedSource = await this.sourceModel
      .findByIdAndUpdate(
        id,
        { $set: updateSourceDto },
        { new: true, useFindAndModify: false }, // Return the updated document
      )
      .exec();

    for (var i = 0; i < updatedSource.tags.length; i++) {
      tag = await this.tagModel.findOne({ name: updatedSource.tags[i] }).exec();
      if (!tag) {
        tag = await this.tagModel.create({ name: updatedSource.tags[i] });
      }
      tag.sources.push(id);
      tag.save();
    }
    // Return the updated document, or null if not found
    return updatedSource;
  }

  async findById(id: ObjectId): Promise<Source | null> {
    return this.sourceModel.findById(id).exec();
  }

  async findAll() {
    return this.sourceModel.find().exec();
  }

  async findByOffset(offset: number): Promise<Source[] | null> {
    const size = 10;
    const sources = await this.sourceModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
    offset--;
    offset *= size;
    return sources.slice(offset, offset + size);
  }

  async findByTag(tagname: string): Promise<Source[]> {
    const sources = new Array<Source>();
    const tag = await this.tagModel.findOne({ name: tagname }).exec();
    if (tag) {
      for (let i = 0; i < tag.sources.length; i++) {
        sources.push(await this.sourceModel.findById(tag.sources[i]).exec());
      }
    }
    return sources;
  }
}
